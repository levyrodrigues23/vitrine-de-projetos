import type { Meta, StoryObj } from "@storybook/react";
import Layout from "./layout.tsx";

const meta: Meta<typeof Layout> = {
  title: "Layout/MainLayout",
  component: Layout,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Layout>;

export const Default: Story = {
  args: {},
};
