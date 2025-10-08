<script setup>
import CourseServices from "../services/courseServices";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const courses = ref([]);
const message = ref("Course Homepage");


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
        <v-card-title> My Classes </v-card-title>
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
              </tr>
            
            </tbody>
          </v-table> 
      </v-card>
    </v-container>
  </div>
</template>
