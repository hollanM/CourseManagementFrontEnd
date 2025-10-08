<script setup>
import CourseServices from "../services/courseServices";
import LessonServices from "../services/lessonServices";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const course = ref({});
const lessons = ref([]);
const message = ref("Add, Edit or Delete Lessons");

const props = defineProps({
  id: {
    required: true,
  },
});

const retrieveLessons = () => {
  CourseServices.get(props.id)
    .then((response) => {
      course.value = response.data;
      LessonServices.getAllLessons(props.id)
        .then((response) => {
          lessons.value = response.data;
        })
        .catch((e) => {
          message.value = e.response.data.message;
        });
    })
    .catch((e) => {
      message.value = e.response.data.message;
    });
};

const editCourse = () => {
  router.push({ name: "edit", params: { id: props.id } });
};

const editLesson = (lesson) => {
  router.push({
    name: "editLesson",
    params: { courseId: props.id, lessonId: lesson.id },
  });
};

const addLesson = () => {
  router.push({ name: "addLesson", params: { courseId: props.id } });
};

const deleteLesson = (lesson) => {
  LessonServices.deleteLesson(lesson.courseId, lesson.id)
    .then(() => {
      retrieveLessons();
    })
    .catch((e) => {
      message.value = e.response.data.message;
    });
};

onMounted(() => {
  retrieveLessons();
});
</script>

<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Course View</v-toolbar-title>
      </v-toolbar>
      <br />
      <v-card>
        <v-card-title>
          {{ course.title }}
          <v-btn class="mx-2" color="primary" @click="editCourse">Edit</v-btn>
          <v-btn class="mx-2" color="success" @click="addLesson"
            >Add Lesson</v-btn
          >
        </v-card-title>
        <v-card-text>
          <b>{{ message }}</b>
        </v-card-text>
        <v-table>
          <thead>
            <tr>
              <th class="text-left">Dept</th>
              <th class="text-left">Course Number</th>
              <th class="text-left">Name</th>
              <th class="text-left">Level</th>
              <th class="text-left">Hour</th>
              <th class="text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in lessons" :key="item.title">
              <td>{{ item.title }}</td>
              <td>{{ item.description }}</td>
              <td>
                <v-icon small class="mx-4" @click="editLesson(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small class="mx-4" @click="deleteLesson(item)">
                  mdi-trash-can
                </v-icon>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card>
    </v-container>
  </div>
</template>
