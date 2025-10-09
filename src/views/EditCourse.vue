<script setup>
import { ref, onMounted } from "vue";
import CourseServices from "../services/courseServices";
import { useRouter } from "vue-router";

const router = useRouter();
const valid = ref(false);
const course = ref({});
const message = ref("Enter data and click save");

const props = defineProps({
  id: {
    required: true,
  },
});

const retrieveCourse = async () => {
  try {
    const response = await CourseServices.get(props.id);
    course.value = response.data;
  } catch (e) {
    message.value = e.response.data.message;
  }
};

const updateCourse = async () => {
  const data = {
    dept: course.value.dept,
    courseNo: course.value.courseNo,
    name: course.value.name,
    level: course.value.level,
    hour: course.value.hour,
    description: course.value.description,
  };
  try {
    const response = await CourseServices.update(props.id, data);
    course.value.id = response.data.id;
    router.push({ name: "courses" });
  } catch (e) {
    message.value = e.response.data.message;
  }
};

const cancel = () => {
  router.push({ name: "courses" });
};

onMounted(() => {
  retrieveCourse();
});
</script>

<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Course Edit</v-toolbar-title>
      </v-toolbar>
      <br />
      <h4>{{ message }}</h4>
      <br />
      <v-form ref="form" v-model="valid" lazy validation>
        <v-text-field
          v-model="course.dept"
          id="dept"
          :counter="6"
          label="Department"
          required
        ></v-text-field>
        <v-text-field
          v-model="course.courseNo"
          id="courseNo"
          :counter="10"
          label="Course Number"
          required
        ></v-text-field>
        <v-text-field
          v-model="course.name"
          id="name"
          :counter="100"
          label="Name"
          required
        ></v-text-field>
        <v-text-field
          v-model="course.level"
          id="level"
          :counter="2"
          label="Level"
          required
        ></v-text-field>
        <v-text-field
          v-model="course.hour"
          id="hour"
          :counter="2"
          label="Hour"
          required
        ></v-text-field>
        <v-text-field
          v-model="course.description"
          id="description"
          :counter="2000"
          label="Description"
          required
        ></v-text-field>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="updateCourse()"
        >
          Save
        </v-btn>

        <v-btn color="error" class="mr-4" @click="cancel()"> Cancel </v-btn>
      </v-form>
    </v-container>
  </div>
</template>
