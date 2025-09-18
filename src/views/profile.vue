<template>
  <section class="p-8">
    <div
      class="w-full h-[80vh] flex items-center justify-center"
      v-if="loading"
    >
      <Spinner class="m-auto" />
    </div>
    <div v-else class="flex flex-col gap-4">
      <SectionHeader
        title="Profile"
        desc="View all your profile details here."
      />
      <hr class="text-gray-200" />

      <!-- Main Profile Content -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
        <!-- Left Column: User Profile Card -->
        <div class="space-y-6">
          <!-- User Profile Card -->
          <Card class="bg-gray-800 border-gray-700 !p-8 !shadow-md">
            <template #content>
              <div class="flex flex-col items-center text-center space-y-4">
                <img
                  :src="data?.image"
                  :alt="data?.firstName + ' ' + data?.lastName"
                  class="w-32 h-32 rounded-full object-cover border-4 border-gray-600"
                />
                <h1 class="text-3xl font-bold">
                  {{ data?.firstName + " " + data?.lastName }}
                </h1>
                <Tag
                  severity="success"
                  :value="data?.company.department"
                  class="w-fit"
                />
              </div>
            </template>
          </Card>

          <Card class="bg-gray-800 border-gray-700 !p-6 !shadow-md">
            <template #header>
              <h3 class="text-xl font-bold border-b-gray-500">
                My Todos ( {{ todos.total }} )
              </h3>
            </template>
            <template #content>
              <div class="space-y-3">
                <div
                  v-for="todo in todos.todos"
                  :key="todo.id"
                  class="flex items-center justify-between gap-3 p-3 rounded-lg border border-gray-200"
                >
                  <div class="flex items-center gap-3 min-w-0">
                    <i
                      class="pi"
                      :class="{
                        'pi-circle text-gray-500': !todo.completed,
                        'pi-check-circle text-green-500': todo.completed,
                      }"
                      style="font-size: 1rem"
                    ></i>
                    <span
                      class="truncate"
                      :class="{ 'line-through text-gray-400': todo.completed }"
                    >
                      {{ todo?.todo }}
                    </span>
                  </div>
                  <Badge
                    size="small"
                    :severity="todo.completed ? 'success' : 'warn'"
                  >
                    {{ todo.completed ? "Completed" : "Pending" }}
                  </Badge>
                </div>
              </div>
            </template>
          </Card>
        </div>

        <!-- Right Column: Bio & Details Card -->
        <div class="space-y-6">
          <Card class="bg-gray-800 border-gray-700 !p-6 !shadow-md">
            <template #header>
              <div class="flex items-center space-x-2">
                <h3 class="text-xl font-bold">Bio & other details</h3>
                <div class="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            </template>
            <template #content>
              <div class="space-y-6">
                <!-- Details Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p class="text-gray-400 text-sm">My Role</p>
                    <p class="font-semibold">
                      {{ data?.company?.title || "Software Developer" }}
                    </p>
                  </div>
                  <div>
                    <p class="text-gray-400 text-sm">My Experience Level</p>
                    <p class="text-green-400 font-semibold">Intermediate</p>
                  </div>
                  <div>
                    <p class="text-gray-400 text-sm">My 3 Favorite Artists</p>
                    <p class="font-semibold">
                      Ninho, Travis Scott, Metro Boomin
                    </p>
                  </div>
                  <div>
                    <p class="text-gray-400 text-sm">My Favorite Music Genre</p>
                    <p class="font-semibold">Trap</p>
                  </div>
                  <div>
                    <p class="text-gray-400 text-sm">
                      The Software or Equipment I Use
                    </p>
                    <p class="font-semibold">Ableton</p>
                  </div>
                  <div>
                    <p class="text-gray-400 text-sm">My Preferred Music Mood</p>
                    <p class="font-semibold">Melancholic</p>
                  </div>
                  <div>
                    <p class="text-gray-400 text-sm">My City or Region</p>
                    <p class="font-semibold">
                      {{ data?.address?.city }}, {{ data?.address?.country }}
                    </p>
                  </div>
                  <div>
                    <p class="text-gray-400 text-sm">Availability</p>
                    <Button
                      label="Available for Collaboration"
                      severity="success"
                      size="small"
                      class="!bg-green-600 !border-green-600 hover:!bg-green-700"
                    >
                      <template #icon>
                        <i class="pi pi-circle-fill text-green-400 mr-2"></i>
                      </template>
                    </Button>
                  </div>
                </div>

                <!-- Badges Section -->
                <div class="flex justify-between flex-wrap">
                  <div>
                    <h4 class="font-semibold mb-3">Badges</h4>
                    <div class="flex space-x-2">
                      <div
                        class="bg-blue-500 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1"
                      >
                        <i class="pi pi-trophy text-xs"></i>
                        <span>Top Collaborator</span>
                      </div>
                    </div>
                  </div>

                  <!-- Tags Section -->
                  <div>
                    <h4 class="font-semibold mb-3">Tags</h4>
                    <div class="flex flex-wrap gap-2">
                      <span class="text-blue-400 text-sm">#Drill</span>
                      <span class="text-blue-400 text-sm">#Melancholic</span>
                      <span class="text-blue-400 text-sm">#Rap-US</span>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </Card>

          <!-- last post -->
          <Card class="!p-6 !shadow-md">
            <template #header>
              <h3 class="text-xl font-bold">Last Post</h3>
            </template>
            <template #content>
              <div class="space-y-3">
                <div
                  v-for="post in posts.posts"
                  :key="post.id"
                  class="flex flex-wrap items-start gap-3 p-4 rounded-lg border border-gray-200 transition-colors"
                >
                  <img :src="data.image" alt="" class="rounded-full w-[3rem]" />
                  <div class="flex-1 min-w-0">
                    <h1>{{ data.firstName }}</h1>
                    <h4 class="text-base font-semibold truncate">
                      {{ post?.title }}
                    </h4>
                    <p class="text-xs text-gray-400 mt-1 truncate">
                      {{ post?.body }}
                    </p>
                  </div>
                  <div class="flex items-center gap-3 shrink-0 text-sm">
                    <span class="inline-flex items-center gap-1 text-green-400">
                      <i
                        class="pi pi-thumbs-up-fill"
                        style="font-size: 0.95rem"
                      ></i>
                      <span>{{ post.reactions.likes }}</span>
                    </span>
                    <span class="inline-flex items-center gap-1 text-red-400">
                      <i
                        class="pi pi-thumbs-down-fill"
                        style="font-size: 0.95rem"
                      ></i>
                      <span>{{ post.reactions.dislikes }}</span>
                    </span>
                    <span class="inline-flex items-center gap-1 text-blue-400">
                      <i class="pi pi-eye" style="font-size: 0.95rem"></i>
                      <span>{{ post.views }}</span>
                    </span>
                  </div>
                </div>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import SectionHeader from "@/components/SectionHeader.vue";
import Spinner from "@/components/Spinner.vue";
import { useUserStore } from "@/stores/UserStore";
import { useTodosStore } from "@/stores/TodosStore";
import { usePostsStore } from "@/stores/PostsStore";
import { onMounted, computed, ref } from "vue";
import Card from "primevue/card";
import Tag from "primevue/tag";
import Button from "primevue/button";
import Badge from "primevue/badge";

const userStore = useUserStore();
const todosStore = useTodosStore();
const postsStore = usePostsStore();

const data = computed(() => userStore.data);
const loading = ref(true);
const todos = computed(() => todosStore.data);
const posts = computed(() => postsStore.posts);

onMounted(async () => {
  try {
    await userStore.getCurrentUser();
    if (data.value.id) {
      await todosStore.getUserTodos(data?.value?.id);
      await postsStore.getUserPosts(data?.value?.id);
    }
  } catch (err) {
    console.log(err);
  } finally {
    loading.value = false;
  }
});
</script>

<style></style>
