<template>
  <section class="w-full ml-8 mt-8">
    <div class="w-full h-full flex items-center" v-if="loading">
      <Spinner class="m-auto" />
    </div>
    <div v-else class="flex flex-col gap-4">
      <SectionHeader
        title="Profile"
        desc="View all your profile details here."
      />
      
      <!-- Main Profile Content -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
        <!-- Left Column: User Profile Card -->
        <div class="space-y-6">
          <!-- User Profile Card -->
          <Card class="bg-gray-800 border-gray-700 !p-8">
            <template #content>
              <div class="flex flex-col items-center text-center space-y-4">
                <img 
                  :src="data?.image" 
                  :alt="data?.firstName + ' ' + data?.lastName" 
                  class="w-32 h-32 rounded-full object-cover border-4 border-gray-600"
                />
                <h1 class="text-3xl font-bold ">
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

          <!-- Social Media Section -->
          <!-- <Card class="bg-gray-800 border-gray-700 !p-6">
            <template #header>
              <h3 class="text-xl font-bold text-white">Social Media</h3>
            </template>
            <template #content>
              <div class="flex space-x-4 justify-center">
                <div class="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors">
                  <i class="pi pi-youtube text-white text-lg"></i>
                </div>
                <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
                  <i class="pi pi-instagram text-white text-lg"></i>
                </div>
                <div class="w-12 h-12 bg-black rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors">
                  <i class="pi pi-music text-white text-lg"></i>
                </div>
              </div>
            </template>
          </Card> -->
        </div>

        <!-- Right Column: Bio & Details Card -->
        <div>
          <Card class="bg-gray-800 border-gray-700 !p-6">
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
                    <p class=" font-semibold">{{ data?.company?.title || 'Software Developer' }}</p>
                  </div>
                  <div>
                    <p class="text-gray-400 text-sm">My Experience Level</p>
                    <p class="text-green-400 font-semibold">Intermediate</p>
                  </div>
                  <div>
                    <p class="text-gray-400 text-sm">My 3 Favorite Artists</p>
                    <p class=" font-semibold">Ninho, Travis Scott, Metro Boomin</p>
                  </div>
                  <div>
                    <p class="text-gray-400 text-sm">My Favorite Music Genre</p>
                    <p class=" font-semibold">Trap</p>
                  </div>
                  <div>
                    <p class="text-gray-400 text-sm">The Software or Equipment I Use</p>
                    <p class=" font-semibold">Ableton</p>
                  </div>
                  <div>
                    <p class="text-gray-400 text-sm">My Preferred Music Mood</p>
                    <p class=" font-semibold">Melancholic</p>
                  </div>
                  <div>
                    <p class="text-gray-400 text-sm">My City or Region</p>
                    <p class=" font-semibold">{{ data?.address?.city }}, {{ data?.address?.country }}</p>
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
                <div>
                  <h4 class=" font-semibold mb-3">Badges</h4>
                  <div class="flex space-x-2">
                    <div class="bg-blue-500  px-3 py-1 rounded-full text-sm flex items-center space-x-1">
                      <i class="pi pi-trophy text-xs"></i>
                      <span>Top Collaborator</span>
                    </div>
                  </div>
                </div>

                <!-- Tags Section -->
                <div>
                  <h4 class=" font-semibold mb-3">Tags</h4>
                  <div class="flex flex-wrap gap-2">
                    <span class="text-blue-400 text-sm">#Drill</span>
                    <span class="text-blue-400 text-sm">#Melancholic</span>
                    <span class="text-blue-400 text-sm">#Rap-US</span>
                  </div>
                </div>
              </div>
            </template>
          </Card>
        </div>
      </div>

      <!-- My Productions Section -->
      
    </div>
  </section>
</template>

<script lang="ts" setup>
import SectionHeader from "@/components/SectionHeader.vue";
import Spinner from "@/components/Spinner.vue";
import { useUserStore } from "@/stores/UserStore";
import { onMounted, computed, ref } from "vue";
import Card from "primevue/card";
import Tag from 'primevue/tag';
import Button from 'primevue/button';

const userStore = useUserStore();
const data = computed(() => userStore.data);
const loading = ref(true);

onMounted(async () => {
  await userStore.getCurrentUser();
  setTimeout(() => (loading.value = false), 1000);
});
</script>

<style></style>
