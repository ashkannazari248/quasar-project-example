<template>
  <q-card-section>
    <div class="text-h6">وییرایش پروفایل</div>
  </q-card-section>

  <q-separator
    dark
    inset />


  <q-card-section>
    <app-form
      class="column q-gutter-y-md"
      @submit="execute()">
      <q-input
        v-model="body.first_name"
        :rules="[requiredRule]"
        label="نام" />

      <q-input
        v-model="body.last_name"
        :rules="[requiredRule]"
        label="نام خانوادگی" />

      <q-input
        v-model="body.address"
        :rules="[requiredRule]"
        label="آدرس" />

      <q-input
        v-model="body.school"
        :rules="[requiredRule]"
        label="مدرسه" />

      <div
        v-if="userFormDataData.data.genders"
        class="q-gutter-sm row items-center">
        <span>جنسیت :</span>
        <q-radio
          v-for="(item,i) in userFormDataData.data.genders"
          :key="i"
          v-model="body.gender_id"
          :rules="[requiredRule]"
          left-label
          :val="item.id"
          :label="item.title" />
      </div>

      <q-select
        v-model="body.major_id"
        :rules="[requiredRule]"
        option-value="id"
        option-label="name"
        :options="userFormDataData.data.majors"
        label="رشته" />

      <q-select
        v-model="body.grade_id"
        :rules="[requiredRule]"
        option-value="id"
        option-label="name"
        :options="userFormDataData.data.grades"
        label="تحصیلات" />

      <q-select
        v-model="ostan"
        :rules="[requiredRule]"
        option-value="id"
        option-label="title"
        :options="userFormDataData.data.provinces"
        label="استان"
        @update:model-value="clearShahr" />

      <q-select
        v-model="body.shahr_id"
        :rules="[requiredRule]"
        option-value="id"
        option-label="title"
        :options="ostan && userFormDataData?.data?.cities ?userFormDataData.data.cities.filter(el=>el.province.id===ostan):[]"
        label="شهر" />

      <q-btn
        label="ورود"
        type="submit"
        color="primary"
      />
    </app-form>
  </q-card-section>
</template>
<script setup lang="ts">
import AppForm from 'src/components/AppForm.vue';
import { useUserFormData } from 'src/composables/modules/useUserFormData';
import { useUserUpdate } from 'src/composables/modules/userUpdate';
import { ref } from 'vue';
import { requiredRule } from 'src/utils';
import { useAppStore } from 'stores/app-store';


const { userData } = useAppStore();
const { body, execute } = useUserUpdate();
const { execute: userFormDataExecute, responseData: userFormDataData } = useUserFormData();
userFormDataExecute();
const ostan=ref<number|null>(userData?.shahr?.ostan.id || null)
function clearShahr(){
  if(body.shahr_id)
  body.shahr_id=null
}


</script>
<style scoped>

</style>
