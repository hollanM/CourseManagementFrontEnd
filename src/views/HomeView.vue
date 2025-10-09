<script setup>
import CourseServices from "../services/courseServices";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const courses = ref([]);
const message = ref("My Classes");

const deleteCourse = (course) => {
  CourseServices.delete(course.id)
    .then(() => {
      retrieveCourses();
    })
    .catch((e) => {
      message.value = e.response.data.message;
    });
};

const retrieveCourses = () => {
  CourseServices.getAll()
    .then((response) => {
      courses.value = response.data;
    })
    .catch((e) => {
      message.value = e.response.data.message;
    });
};

retrieveCourses();
</script>

<template>
  <div>
    <v-container>
     
      <v-card>
        <v-card-title> Course Homepage </v-card-title>
        <v-card-text>
          <b>{{ message }}</b>
        </v-card-text>
          <v-table>
            <thead>
              <tr>
                <th class="text-left">Department</th>
                <th class="text-left">Name</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in courses" :key="item.title">
              <td>{{ item.dept }}</td>
              <td>{{ item.name }}</td>
                <td>
                <div style="display: flex; align-items: center;">
                  <v-icon small class="mx-4" @click="deleteCourse(item)">
                    mdi-trash-can
                  </v-icon>
                </div>
              </td>
              </tr> 
            </tbody>
          </v-table> 
        <v-pagination v-model="page":length="Math.ceil(filteredCourses.length / itemsPerPage)"class="mt-4"/>

      </v-card>
    </v-container>
  </div>
</template>
