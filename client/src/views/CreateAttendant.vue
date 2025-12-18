<script setup lang="ts">
import { NButton, NInput, NIcon, NFormItem, NRadioGroup, NRadio, NSpace, NForm } from 'naive-ui';
import type { FormInst } from 'naive-ui';
import { ref } from 'vue';
import type { Attendant, AttendantDto } from '@/types/Attendant.ts';
import { createAttendant } from '@/services/attendant.ts';
import { useRouter } from 'vue-router';

const formValue = ref<AttendantDto>({
  name: '',
  team: '',
});

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

        <n-form-item label="Tournament ID" path="tournamentId">
          <input type="number" v-model:="formValue.tournamentId" placeholder="Enter tournament ID" />
        </n-form-item>

        <n-button type="primary" @click="handleValidateClick">Create Attendant</n-button>
      </n-form>

      <div>{{ message }}</div>
    </div>
  </div>
</template>
