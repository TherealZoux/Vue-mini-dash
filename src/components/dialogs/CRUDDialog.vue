<template>
  <Dialog
    v-model:visible="dialogVisible"
    :header="dialogTitle"
    :modal="true"
    :closable="true"
    :draggable="false"
    class="w-full max-w-6xl"
    @hide="onDialogHide"
  >
    <AppForm
      :initial-values="initialData"
      :onSubmit="submit"
      :validation-schema="validationSchema"
      :login="false"
      v-slot="{ errors }"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="field in fields"
          :key="field.name"
          class="flex flex-col gap-2 w-full"
        >
          <label :for="field.name" class="text-sm font-medium text-gray-700">
            {{ field.name }}
            <span v-if="field.required" class="text-red-500">*</span>
          </label>

          <!-- Text Input -->
          <Field
            v-if="field.type == 'text'"
            :name="field.name"
            v-slot="{ field: fieldProps, errorMessage }"
          >
            <InputText
              v-bind="fieldProps"
              :id="field.name"
              :type="field.type"
              :placeholder="field.placeholder"
              :class="{ 'p-invalid': errorMessage }"
              class="w-full"
            />
            <small v-if="errorMessage" class="text-red-500 text-xs">
              {{ errorMessage }}
            </small>
          </Field>

          <!-- Number Input -->
          <Field
            v-else-if="field.type == 'number'"
            :name="field.name"
            v-slot="{ field: fieldProps, errorMessage, value, handleChange }"
          >
            <InputNumber
              :id="field.name"
              :placeholder="field.placeholder"
              :class="{ 'p-invalid': errorMessage }"
              class="w-full"
              :inputId="field.name"
              :modelValue="value"
              @update:modelValue="handleChange"
              :useGrouping="false"
            />
            <small v-if="errorMessage" class="text-red-500 text-xs">
              {{ errorMessage }}
            </small>
          </Field>

          <!-- Textarea -->
          <Field
            v-else-if="field.type === 'textarea'"
            :name="field.name"
            v-slot="{ field: fieldProps, errorMessage }"
          >
            <Textarea
              v-bind="fieldProps"
              :id="field.name"
              :placeholder="field.placeholder"
              :rows="field.rows || 3"
              :class="{ 'p-invalid': errorMessage }"
              class="w-full"
            />
            <small v-if="errorMessage" class="text-red-500 text-xs">
              {{ errorMessage }}
            </small>
          </Field>

          <!-- Dropdown -->
          <Field
            v-else-if="field.type === 'select'"
            :name="field.name"
            v-slot="{ field: fieldProps, errorMessage }"
          >
            <Dropdown
              v-bind="fieldProps"
              :id="field.name"
              :options="field.options"
              :optionLabel="field.optionLabel || 'label'"
              :optionValue="field.optionValue || 'value'"
              :placeholder="field.placeholder || 'Select an option'"
              :class="{ 'p-invalid': errorMessage }"
              class="w-full"
            />
            <small v-if="errorMessage" class="text-red-500 text-xs">
              {{ errorMessage }}
            </small>
          </Field>

          <!-- Checkbox -->
          <Field
            v-else-if="field.type === 'checkbox'"
            :name="field.name"
            :type="field.type"
            :value="true"
            :unchecked-value="false"
            v-slot="{ field: fieldProps, errorMessage }"
          >
            <div class="flex items-center gap-2">
              <Checkbox
                v-bind="fieldProps"
                :id="field.name"
                :binary="true"
                :class="{ 'p-invalid': errorMessage }"
              />
              <label :for="field.name" class="text-sm">
                {{ field.checkboxLabel || field.label }}
              </label>
            </div>
            <small v-if="errorMessage" class="text-red-500 text-xs">
              {{ errorMessage }}
            </small>
          </Field>

          <!-- Date Input -->
          <Field
            v-else-if="field.type === 'date'"
            :name="field.name"
            v-slot="{ field: fieldProps, errorMessage }"
          >
            <Calendar
              v-bind="fieldProps"
              :id="field.name"
              :placeholder="field.placeholder"
              :class="{ 'p-invalid': errorMessage }"
              class="w-full"
            />
            <small v-if="errorMessage" class="text-red-500 text-xs">
              {{ errorMessage }}
            </small>
          </Field>
        </div>
      </div>

      <!-- Form Actions -->
      <div class="flex justify-end gap-2 mt-6">
        <Button
          label="Cancel"
          severity="secondary"
          @click="onCancel"
          class="px-4 py-2"
        />
        <Button
          type="submit"
          :label="submitLabel"
          :loading="loading"
          class="px-4 py-2"
        />
      </div>
    </AppForm>
  </Dialog>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { Field } from "vee-validate";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Textarea from "primevue/textarea";
import Dropdown from "primevue/dropdown";
import Checkbox from "primevue/checkbox";
import Calendar from "primevue/calendar";
import Button from "primevue/button";
import AppForm from "../AppForm.vue";

// Props
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
  fields: {
    type: Array,
    required: true,
    validator: (fields) => {
      return fields.every((field) => field.name && field.label && field.type);
    },
  },
  validationSchema: {
    type: Object,
    required: true,
  },
  initialData: {
    type: Object,
    default: () => ({}),
  },
  loading: {
    type: Boolean,
    default: false,
  },
  mode: {
    type: String,
    default: "create",
    validator: (value) => ["create", "edit"].includes(value),
  },
  submit: {
    type: Function,
    required: true,
  },
});

// Emits
const emit = defineEmits(["update:visible", "submit", "cancel"]);

// Refs
const formRef = ref(null);

// Computed
const dialogVisible = computed({
  get: () => props.visible,
  set: (value) => emit("update:visible", value),
});

const dialogTitle = computed(() => props.title);

const submitLabel = computed(() => {
  return props.mode === "edit" ? "Update" : "Create";
});

const onCancel = () => {
  emit("cancel");
  dialogVisible.value = false;
};

const onDialogHide = () => {
  emit("update:visible", false);
};
</script>

<style scoped></style>
