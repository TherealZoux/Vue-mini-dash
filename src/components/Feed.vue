<template>
  <div class="w-full max-w-2xl mx-auto">
    <!-- Feed Header -->
    <div class="sticky top-0 border-bp-4 z-10">
      <h2 class="text-xl font-bold">Posts Feed</h2>
    </div>

    <!-- Timeline Posts -->
    <div class="divide-y">
      <article
        v-for="post in posts"
        :key="post.id"
        class="post-item transition-colors duration-200 cursor-pointer"
        @click="$emit('view', post)"
      >
        <div class="p-4">
          <!-- Post Header -->
          <div class="flex items-start space-x-3">
            <!-- User Avatar -->
            <div class="flex-shrink-0">
              <Avatar
                :label="getUserInitials(post.userId)"
                class="w-12 h-12 text-sm font-semibold"
                shape="circle"
              />
            </div>

            <!-- Post Content -->
            <div class="flex-1 min-w-0">
              <!-- User Info & Time -->
              <div class="flex items-center space-x-2 mb-2">
                <h3 class="text-sm font-semibold">User {{ post.userId }}</h3>
                <span class="text-sm">·</span>
                <time class="text-sm">
                  {{ formatTime(post.createdAt) }}
                </time>
                <div class="ml-auto">
                  <Button
                    icon="pi pi-ellipsis-h"
                    class="p-button-text p-button-sm"
                    @click.stop="$emit('menu', post)"
                  />
                </div>
              </div>

              <!-- Post Title (if exists) -->
              <h4
                v-if="post.title"
                class="text-base font-semibold mb-2 leading-tight"
              >
                {{ post.title }}
              </h4>

              <!-- Post Body -->
              <p class="text-base leading-relaxed mb-3">
                {{ post.body }}
              </p>

              <!-- Post Image (if exists) -->
              <div v-if="post.thumbnail" class="mb-3">
                <img
                  :src="post.thumbnail"
                  :alt="post.title || 'Post image'"
                  class="rounded-lg w-full max-w-md object-cover"
                />
              </div>

              <!-- Tags -->
              <div v-if="post.tags && post.tags.length > 0" class="mb-3">
                <div class="flex flex-wrap gap-1">
                  <span
                    v-for="tag in post.tags"
                    :key="tag"
                    class="inline-block px-2 py-1 text-xs font-medium rounded-full"
                  >
                    #{{ tag }}
                  </span>
                </div>
              </div>

              <!-- Post Actions -->
              <div class="flex items-center justify-between max-w-md">
                <!-- Reply -->
                <Button
                  icon="pi pi-comment"
                  class="p-button-text p-button-sm"
                  @click.stop="$emit('comment', post)"
                >
                  <span class="ml-2 text-sm">{{
                    formatNumber(post.comments || 0)
                  }}</span>
                </Button>

                <!-- Retweet/Share -->
                <Button
                  icon="pi pi-share-alt"
                  class="p-button-text p-button-sm"
                  @click.stop="$emit('share', post)"
                >
                  <span class="ml-2 text-sm">{{
                    formatNumber(post.shares || 0)
                  }}</span>
                </Button>

                <!-- Like -->
                <Button
                  icon="pi pi-heart"
                  class="p-button-text p-button-sm"
                  @click.stop="$emit('like', post)"
                >
                  <span class="ml-2 text-sm">{{
                    formatNumber(post.reactions?.likes || 0)
                  }}</span>
                </Button>

                <!-- Views -->
                <div class="flex items-center text-sm">
                  <i class="pi pi-eye mr-1"></i>
                  <span>{{ formatNumber(post.views || 0) }}</span>
                </div>

                <!-- Admin Actions (if needed) -->
                <div class="flex items-center space-x-1">
                  <Button
                    icon="pi pi-pencil"
                    class="p-button-text p-button-sm hover:text-blue-500"
                    @click.stop="$emit('edit', post)"
                  />
                  <Button
                    icon="pi pi-trash"
                    class="p-button-text p-button-sm hover:text-red-500"
                    @click.stop="$emit('delete', post)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>

    <!-- Empty State -->
    <div v-if="!posts || posts.length === 0" class="text-center py-12">
      <i class="pi pi-inbox text-6xl mb-4"></i>
      <h3 class="text-xl font-semibold mb-2">No posts available</h3>
      <p class="">Check back later for new content</p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="divide-y">
      <div v-for="n in 5" :key="n" class="p-4 animate-pulse">
        <div class="flex items-start space-x-3">
          <div class="w-12 h-12 rounded-full"></div>
          <div class="flex-1 space-y-2">
            <div class="flex items-center space-x-2">
              <div class="h-4 rounded w-24"></div>
              <div class="h-4 rounded w-16"></div>
            </div>
            <div class="space-y-2">
              <div class="h-4 rounded w-full"></div>
              <div class="h-4 rounded w-3/4"></div>
            </div>
            <div class="flex space-x-6">
              <div class="h-4 rounded w-12"></div>
              <div class="h-4 rounded w-12"></div>
              <div class="h-4 rounded w-12"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import Button from "primevue/button";
import Avatar from "primevue/avatar";

// TypeScript interfaces
interface PostReactions {
  likes: number;
  dislikes: number;
}

interface Post {
  id: number;
  title?: string;
  body: string;
  tags?: string[];
  reactions?: PostReactions;
  views?: number;
  userId: number;
  thumbnail?: string;
  userLiked?: boolean;
  userDisliked?: boolean;
  createdAt?: string;
  updatedAt?: string;
  comments?: number;
  shares?: number;
}

// Props
interface Props {
  posts: Post[];
  loading?: boolean;
  showActions?: boolean;
  showReactions?: boolean;
  showStats?: boolean;
  maxTitleLength?: number;
  maxBodyLength?: number;
}

const props = withDefaults(defineProps<Props>(), {
  posts: () => [],
  loading: false,
  showActions: true,
  showReactions: true,
  showStats: true,
  maxTitleLength: 100,
  maxBodyLength: 150,
});

// Emits
interface Emits {
  (e: "view", post: Post): void;
  (e: "edit", post: Post): void;
  (e: "delete", post: Post): void;
  (e: "like", post: Post): void;
  (e: "dislike", post: Post): void;
  (e: "comment", post: Post): void;
  (e: "share", post: Post): void;
  (e: "menu", post: Post): void;
}

const emit = defineEmits<Emits>();

// Computed properties
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num?.toString() || "0";
};

const getUserInitials = (userId: number): string => {
  return `U${userId}`;
};

const formatTime = (dateString?: string): string => {
  if (!dateString) return "now";

  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d`;

  return date.toLocaleDateString();
};

const truncatedTitle = (title: string): string => {
  return title.length > props.maxTitleLength
    ? title.substring(0, props.maxTitleLength) + "..."
    : title;
};

const truncatedBody = (body: string): string => {
  return body.length > props.maxBodyLength
    ? body.substring(0, props.maxBodyLength) + "..."
    : body;
};
</script>
