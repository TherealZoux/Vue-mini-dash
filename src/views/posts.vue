<template>
  <section class="p-8">
    <SectionHeader
      title="Posts"
      desc="View all Posts details here."
      :show-add-button="true"
      add-button-title="Add new Post"
      @add="openAddDialog"
    />
    <hr class="text-gray-200 mt-4" />
    <AppTable
      :columns="columns"
      :data="posts?.data?.posts"
      header="All Posts"
      add-dialog-title="Add new post"
      class="mt-8"
      :initialValues="initialValues"
      :fields="fields"
      :visible="visible"
      :validationSchema="validationSchema"
      @close="handleCloseDialog"
      :submit="handleAddProduct"
    />
  </section>
</template>

<script lang="ts" setup>
import AppTable from "@/components/AppTable.vue";
import SectionHeader from "@/components/SectionHeader.vue";
import { usePostsStore } from "@/stores/PostsStore";
import { useUserStore } from "@/stores/UserStore";
import { computed, onMounted, h, ref } from "vue";
import * as yup from "yup";

const store = usePostsStore();
const usersStore = useUserStore();
const posts = computed(() => store?.posts);
const visible = ref(false);

const columns = [
  { field: "id", header: "ID" },
  {
    field: "title",
    header: "Title",
    formatter: (val: string) => val.slice(0, 10) + "...",
  },
  {
    field: "body",
    header: "Body",
    formatter: (val: string) => val.slice(0, 70) + "...",
  },
  {
    field: "tags",
    header: "Tags",
    template: (row: any) => {
      if (!row.tags || !Array.isArray(row.tags)) return "";
      return h(
        "div",
        { class: "flex flex-wrap gap-1" },
        row.tags.map((tag: string) =>
          h(
            "span",
            {
              class:
                "inline-block px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700",
            },
            "#" + tag
          )
        )
      );
    },
  },
  {
    field: "reactions",
    header: "Likes / Dislikes",
    template: (row: any) => {
      const likes = row.reactions?.likes ?? 0;
      const dislikes = row.reactions?.dislikes ?? 0;
      return h("span", {}, [
        h("i", { class: "pi pi-heart text-red-500 mr-1" }),
        likes,
        " / ",
        h("i", { class: "pi pi-thumbs-down text-gray-500 mx-1" }),
        dislikes,
      ]);
    },
  },
  { field: "views", header: "Views" },
  {
    field: "userId",
    header: "User",
    template: (row: any) => {
      const user = usersStore?.data?.users?.find(
        (user: any) => user.id === row.userId
      );

      if (!user || !user.image) return "";
      return h("img", {
        src: user.image,
        width: 50,
        alt: user.username || "User",
        style: { borderRadius: "50%", background: "black" },
      });
    },
  },
];

const initialValues = {
  id: null,
  title: "",
  body: "",
  tags: [],
  reactions: {
    likes: 0,
    dislikes: 0,
  },
  views: 0,
  userId: 0,
};

const actions = ["view", "edit", "delet"];

// Validation schema for posts (not products)
const validationSchema = yup.object({
  title: yup.string().required("Title is required"),
  body: yup.string().required("Body is required"),
  userId: yup.number().required("User ID is required"),
});

const fields = computed(() => [
  {
    name: "userId",
    label: "User",
    type: "select",
    required: true,
    options:
      usersStore?.data?.users?.map((user: any) => ({
        label: user.username,
        value: user.id,
      })) || [],
  },
  { name: "title", label: "Title", type: "text", required: true },
  {
    name: "body",
    label: "Body",
    type: "textarea",
    required: true,
  },
  { name: "tags", label: "Tags", type: "text" },
]);

const openAddDialog = () => {
  visible.value = true;
};
const handleCloseDialog = () => {
  visible.value = false;
};
const handleAddProduct = async (values: any) => {
  try {
    await store.createPost(values);
    visible.value = false;
  } catch (error) {}
};
onMounted(async () => {
  await store.getAllPosts();
  await store.getAllComments();
  await usersStore.getAllUsers(500, 0);
});
</script>
