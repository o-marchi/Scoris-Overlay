<script setup lang="ts">
import { NButton, NInput, NIcon, NFormItem, NRadioGroup, NRadio, NSpace, NForm } from 'naive-ui';
import type { FormInst } from 'naive-ui';
import { ref } from 'vue';
import type { Tournament, TournamentDto } from '@/types/Tournament.ts';
import { createTournament } from '@/services/tournament.ts';
import { useRouter } from 'vue-router';

const formValue = ref<TournamentDto>({
  type: 'TEAMS',
  name: '',
});

const formRef = ref<FormInst | null>(null);

const message = ref<string>('');

const rules = {
  name: [
    {
      required: true,
      message: 'Please input the tournament name',
      trigger: 'blur',
    },
  ],
};

const router = useRouter();

const submitForm = async () => {
  const tournament: Tournament = await createTournament(formValue.value);

  if (tournament) {
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
    <h1>New tournament</h1>
    <pre>{{ formValue }}</pre>

    <div>
      <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" size="medium">
        <n-form-item label="Name" path="name">
          <n-input v-model:value="formValue.name" placeholder="Input Name" />
        </n-form-item>

        <n-radio-group v-model:value="formValue.type">
          <n-space>
            <n-radio value="TEAMS"> TEAMS</n-radio>
            <n-radio disabled value="SINGLES"> SINGLES</n-radio>
          </n-space>
        </n-radio-group>

        <n-form-item>
          <br /><br />
          <p v-if="message">{{ message }}</p>
          <n-button @click="handleValidateClick"> Validate</n-button>
        </n-form-item>
      </n-form>
    </div>
  </div>
</template>
