<script setup lang="ts">
import { NButton, NInput, NFormItem, NForm } from 'naive-ui';
import type { FormInst } from 'naive-ui';
import { ref } from 'vue';
import type { Attendant, AttendantDto } from '@/types/Attendant.ts';
import { createAttendant } from '@/services/attendant.ts';
import { useRouter, useRoute } from 'vue-router';

const route = useRoute();
const formValue = ref<AttendantDto>({
  name: '',
  team: '',
  tournamentId: Number(route.params.id),
});

console.log('tournament id', route.params.id);

const formRef = ref<FormInst | null>(null);

const message = ref<string>('');

const rules = {
  name: [
    {
      required: true,
      message: 'Please input the attendant name',
      trigger: 'blur',
    },
  ],
};

const router = useRouter();

const submitForm = async () => {
  const attendant: Attendant = await createAttendant(formValue.value);

  if (attendant) {
    await router.push('/');
  }
};

const handleValidateClick = (e: MouseEvent) => {
  e.preventDefault();

  formRef.value?.validate((errors) => {
    if (errors) {
      message.value = 'Error';
      return;
    }

    submitForm();
  });
};
</script>

<template>
  <div>
    <h1>New attendant</h1>
    <pre>{{ formValue }}</pre>

    <div>
      <n-form ref="formRef" :model="formValue" :rules="rules">
        <n-form-item label="Name" path="name">
          <n-input v-model:value="formValue.name" placeholder="Enter attendant name" />
        </n-form-item>

        <n-form-item label="Team" path="team">
          <n-input v-model:value="formValue.team" placeholder="Enter team name" />
        </n-form-item>

        <n-form-item label="Tournament ID" path="TournamentID">
          <input :value="formValue.tournamentId" disabled />
        </n-form-item>

        <n-button type="primary" @click="handleValidateClick">Create Attendant</n-button>
      </n-form>

      <div>{{ message }}</div>
    </div>
  </div>
</template>
