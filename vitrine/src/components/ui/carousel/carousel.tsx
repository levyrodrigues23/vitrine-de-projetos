import { useEffect, useRef, useState } from "react";
import type { TouchEvent } from "react";
import ArrowLeft from "../../../assets/icons/arrow-left.svg?react";
import ArrowRight from "../../../assets/icons/arrow-right.svg?react";
import Icon from "../icon/icon";

interface CarouselProps {
    images?: string[];
    "aria-label"?: string;
    /** Intervalo do autoplay em ms. Passe 0 para desativar. */
    autoPlayMs?: number;
}

export default function Carousel({
    images = [],
    "aria-label": ariaLabel,
    autoPlayMs = 5000,
}: CarouselProps) {
    const [index, setIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const touchStartX = useRef<number | null>(null);

    const last = images.length - 1;

    const goPrev = () => {
        setIndex((i) => (i === 0 ? last : i - 1));
    };

    const goNext = () => {
        setIndex((i) => (i === last ? 0 : i + 1));
    };

    useEffect(() => {
        if (images.length <= 1 || isPaused || autoPlayMs <= 0) return;

        const intervalId = window.setInterval(() => {
            setIndex((i) => (i === last ? 0 : i + 1));
        }, autoPlayMs);

        return () => window.clearInterval(intervalId);
    }, [images.length, isPaused, autoPlayMs, last]);

    if (images.length === 0) return null;

    function handleTouchStart(event: TouchEvent) {
        touchStartX.current = event.touches[0].clientX;
    }

    function handleTouchEnd(event: TouchEvent) {
        if (touchStartX.current === null) return;
        const delta = event.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(delta) > 40) {
            if (delta > 0) goPrev();
            else goNext();
        }
        touchStartX.current = null;
    }

    return (
        <div
            role="region"
            aria-roledescription="carousel"
            aria-label={ariaLabel ?? "Carrossel de imagens"}
            className="relative max-w-2xl w-full aspect-video overflow-hidden rounded-xl bg-gray-200"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {images.map((src, i) => (
                <img
                    key={src}
                    src={src}
                    alt={`Slide ${i + 1} de ${images.length}`}
                    aria-hidden={i !== index}
                    className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ease-in-out ${
                        i === index ? "opacity-100" : "opacity-0"
                    }`}
                />
            ))}

            {images.length > 1 ? (
                <>
                    <button
                        type="button"
                        onClick={goPrev}
                        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/45 px-3 py-2 text-white backdrop-blur-sm hover:bg-black/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        aria-label="Slide anterior"
                    >
                        <span aria-hidden>
                            <Icon svg={ArrowLeft} />
                        </span>
                    </button>
                    <button
                        type="button"
                        onClick={goNext}
                        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/45 px-3 py-2 text-white backdrop-blur-sm hover:bg-black/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        aria-label="Próximo slide"
                    >
                        <span aria-hidden>
                            <Icon svg={ArrowRight}/>

                        </span>
                    </button>

                    <div
                        className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 flex gap-2"
                        role="tablist"
                        aria-label="Seletor de slides"
                    >
                        {images.map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                role="tab"
                                aria-selected={i === index}
                                aria-label={`Ir para slide ${i + 1}`}
                                onClick={() => setIndex(i)}
                                className={`h-2 rounded-full transition-all duration-300 ${
                                    i === index
                                        ? 'w-8 bg-white'
                                        : 'w-2 bg-white/60 hover:bg-white/80'
                                }`}
                            />
                        ))}
                    </div>
                </>
            ) : null}
        </div>
    );
}
