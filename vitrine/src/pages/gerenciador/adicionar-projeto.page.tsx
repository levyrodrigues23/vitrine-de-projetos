import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";

import {
  projectFormSchema,
  type ProjectFormInput,
  type ProjectFormValues,
} from "../../schemas/project.schema";
import { useCreateProject } from "../../hooks/project/useCreateProject";
import { uploadProjectImage } from "../../services/projects.service";
import type { WorkDone } from "../../types/workDone.types";
import type { Project } from "../../types/project.types";

import {
  Button,
  FormChoiceGrid,
  FormField,
  FormPage,
  FormSectionCard,
  FormTextarea,
  Input,
} from "../../components/ui";
import { WorkDoneForm } from "../../components/features/work-done-form/work-done-form";
import type { ControllerRenderProps } from "react-hook-form";

const CATEGORY_MAP: Record<
  ProjectFormValues["category"],
  Project["category"]
> = {
  inovação: "Inovação",
  extensão: "Extensão",
  pesquisa: "Pesquisa",
};

const DEFAULT_VALUES: ProjectFormInput = {
  category: "inovação",
  title: "",
  responsible: "",
  description: "",
  imageFile: undefined,
  worksDone: [],
};

type MainImageFieldProps = {
  field: ControllerRenderProps<ProjectFormInput, "imageFile">;
  error?: string;
};

function MainImageField({ field, error }: MainImageFieldProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!(field.value instanceof File)) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(field.value);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [field.value]);

  return (
    <FormField label="Imagem de destaque" error={error}>
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="block w-full text-sm text-gray-base-dark file:mr-4 file:rounded-lg file:border-0 file:bg-blue/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-dark hover:file:bg-blue/20"
        onChange={(e) => field.onChange(e.target.files?.[0])}
      />
      {previewUrl && (
        <img
          src={previewUrl}
          alt="Preview da imagem principal do projeto"
          className="mt-3 h-48 w-full rounded-xl object-cover"
        />
      )}
    </FormField>
  );
}

export function AdicionarProjetoPage() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const { execute, loading } = useCreateProject();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormInput, unknown, ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "worksDone",
  });

  const onSubmit = async (values: ProjectFormValues) => {
    setSubmitError(null);
    setSubmitted(false);

    let worksDone: WorkDone[];
    try {
      worksDone = await Promise.all(
        values.worksDone.map(async (item) => {
          let imageUrl = "";
          if (item.imageFile instanceof File) {
            imageUrl = await uploadProjectImage(item.imageFile);
          }
          return {
            id: crypto.randomUUID(),
            title: item.title,
            category: CATEGORY_MAP[item.category],
            description: item.description,
            imageUrl,
          };
        }),
      );
    } catch {
      setSubmitError(
        "Erro ao enviar a imagem de um trabalho realizado. Tente novamente.",
      );
      return;
    }

    const payload = {
      title: values.title,
      description: values.description,
      category: CATEGORY_MAP[values.category],
      responsible: values.responsible,
      worksDone,
    };

    const result = await execute(payload, values.imageFile);

    if (!result.success) {
      setSubmitError(result.error ?? "Erro ao salvar o projeto.");
      return;
    }

    setSubmitted(true);
  };

  const handleAddWorkDone = () => {
    append({
      title: "",
      category: "",
      description: "",
      imageFile: undefined,
    });
  };

  return (
    <FormPage
      title="Adicionar projeto"
      subtitle="Registre projetos de inovação, extensão ou pesquisa com todos os trabalhos produzidos."
    >
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {submitError && (
          <div className="rounded-2xl border border-red/20 bg-red/5 p-4 text-sm text-red">
            {submitError}
          </div>
        )}

        {submitted && (
          <div className="rounded-2xl border border-green-base/30 bg-green-base/5 p-4 text-sm text-green-base-dark font-medium">
            Projeto publicado com sucesso!
          </div>
        )}

        <FormSectionCard
          title="Classificação do projeto"
          description="A seleção abaixo define a trilha de cadastro e facilita o uso em filtros futuros."
        >
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <FormChoiceGrid
                name={field.name}
                title="Escolha a categoria institucional"
                value={field.value}
                onChange={field.onChange}
                error={errors.category?.message}
                choices={[
                  {
                    value: "inovação",
                    title: "Inovação",
                    description: "Soluções, protótipos e validação de ideias.",
                    badge: "Aplicada",
                    accent: "blue",
                  },
                  {
                    value: "extensão",
                    title: "Extensão",
                    description:
                      "Projetos de impacto social e aproximação com a comunidade.",
                    badge: "Território",
                    accent: "green",
                  },
                  {
                    value: "pesquisa",
                    title: "Pesquisa",
                    description:
                      "Produção acadêmica, investigação e experimentação.",
                    badge: "Acadêmica",
                    accent: "yellow",
                  },
                ]}
              />
            )}
          />
        </FormSectionCard>

        <FormSectionCard
          title="Informações do projeto"
          description="Título, responsável e resumo do projeto."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <FormField
              label="Título do projeto"
              required
              error={errors.title?.message}
            >
              <Input
                {...register("title")}
                placeholder="Ex.: Plataforma de Monitoramento de Cultivos"
                className={
                  errors.title
                    ? "border-red/60 focus-visible:ring-red/30"
                    : ""
                }
              />
            </FormField>

            <FormField
              label="Responsável / Orientador"
              required
              error={errors.responsible?.message}
            >
              <Input
                {...register("responsible")}
                placeholder="Nome do professor ou equipe"
                className={
                  errors.responsible
                    ? "border-red/60 focus-visible:ring-red/30"
                    : ""
                }
              />
            </FormField>
          </div>

          <FormField
            label="Resumo do projeto"
            className="mt-5"
            required
            error={errors.description?.message}
          >
            <FormTextarea
              {...register("description")}
              placeholder="Explique objetivo, contexto, público-alvo e estágio atual."
              className={
                errors.description
                  ? "border-red/60 focus-visible:ring-red/30"
                  : ""
              }
            />
          </FormField>
        </FormSectionCard>

        <FormSectionCard
          title="Imagem de destaque"
          description="Imagem principal exibida no card do projeto na vitrine."
        >
          <Controller
            control={control}
            name="imageFile"
            render={({ field }) => (
              <MainImageField
                field={field}
                error={errors.imageFile?.message as string | undefined}
              />
            )}
          />
        </FormSectionCard>

        <FormSectionCard
          title="Trabalhos realizados"
          description="Adicione os trabalhos produzidos neste projeto. Cada item possui título, categoria, descrição e imagem própria."
        >
          <div className="space-y-4">
            {fields.map((field, index) => (
              <WorkDoneForm
                key={field.id}
                index={index}
                control={control}
                register={register}
                errors={errors}
                onRemove={() => remove(index)}
                onMoveUp={() => move(index, index - 1)}
                onMoveDown={() => move(index, index + 1)}
                isFirst={index === 0}
                isLast={index === fields.length - 1}
              />
            ))}

            <Button
              type="button"
              variant="secondary"
              className="w-full"
              onClick={handleAddWorkDone}
            >
              <Plus className="mr-2 h-4 w-4" />
              Adicionar trabalho realizado
            </Button>
          </div>
        </FormSectionCard>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button
            type="submit"
            variant="primary"
            className="px-6 py-3"
            disabled={isSubmitting || loading}
          >
            {isSubmitting || loading ? "Publicando..." : "Publicar projeto"}
          </Button>
        </div>
      </form>
    </FormPage>
  );
}