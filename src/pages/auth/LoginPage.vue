<template>

  <q-card-section>
    <div class="text-h6">ورود به حساب کاربری</div>
  </q-card-section>

  <q-separator
    dark
    inset />


  <q-card-section>
    <app-form
      class="column q-gutter-y-md"
      @submit="execute()">
      <q-input
        v-model="body.mobile"
        :rules="[requiredRule, phoneNumberRule]"
        label="شماره موبایل" />
      <q-input
        v-model="body.password"
        :rules="[requiredRule, numericRule, nationalCodeRule]"
        label="کد ملی" />
      <q-btn
        label="ورود"
        type="submit"
        color="primary"
      />
    </app-form>
  </q-card-section>


</template>
<script setup lang="ts">
import { useLogin } from 'src/composables/modules/login';
import { requiredRule, nationalCodeRule, phoneNumberRule, numericRule } from 'src/utils';
import AppForm from 'components/AppForm.vue';

const { body, execute } = useLogin();


</script>
<style scoped>

</style>
