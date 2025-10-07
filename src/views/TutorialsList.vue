<script setup>
import TutorialServices from "../services/tutorialServices";
import { ref } from "vue";
import { computed, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const courses = ref([]);

const search = ref("");
const page = ref(1);
const itemsPerPage = ref(10);

const filteredCourses = computed(() => {
  const query = search.value.toLowerCase();
  return courses.value.filter((item) =>
    item.dept.toLowerCase().includes(query) ||
    item.name.toLowerCase().includes(query)
  );
});


const paginatedCourses = computed(() => {
  const start = (page.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredCourses.value.slice(start, end);
});


watch(search, () => {
  page.value = 1;
});


const message = ref("Search, Add, Edit or Delete Courses");


const editTutorial = (tutorial) => {
  router.push({ name: "edit", params: { id: tutorial.id } });
};

// const viewTutorial = (tutorial) => {
//   router.push({ name: "view", params: { id: tutorial.id } });
// };

const deleteTutorial = (tutorial) => {
  TutorialServices.delete(tutorial.id)
    .then(() => {
      retrieveTutorials();
    })
    .catch((e) => {
      message.value = e.response.data.message;
    });
};

const retrieveTutorials = () => {
  TutorialServices.getAll()
    .then((response) => {
      courses.value = response.data;
    })
    .catch((e) => {
      message.value = e.response.data.message;
    });
};

const addToHome = (item) => {
  TutorialServices.get(item.id)
    return courses.value.filter((item) =>
      item.dept,
      item.name
  );
};

retrieveTutorials();
</script>

<template>
  <div>
    <v-container>
      <v-text-field v-model="search"label="Search by Department or Course Name" prepend-icon="mdi-magnify" class="mb-4"/>
      <br /><br />
      <v-card>
        <v-card-title> Course Catalogue </v-card-title>
        <v-card-text>
          <b>{{ message }}</b>
        </v-card-text>
        <v-table>
          <thead>
            <tr>
              <th class="text-left">Add to My Courses</th>
              <th class="text-left">Department</th>
              <th class="text-left">Course Number</th>
              <th class="text-left">Name</th>
              <th class="text-left">Level</th>
              <th class="text-left">Hour</th>
              <th class="text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in paginatedCourses" :key="item.id">
              <td>
                <v-btn @click="addToHome()" class="mx-2">Add</v-btn>

                <!-- <v-btn class="mx-2" :to="{ name: 'add' }">Add</v-btn> -->
              </td>
              <td>{{ item.dept }}</td>
              <td>{{ item.courseNo }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.level }}</td>
              <td>{{ item.hour }}</td>
              <td>{{ item.description }}</td>
              <td>
                <div style="display: flex; align-items: center;">
                  <v-icon small class="mx-4" @click="editTutorial(item)">
                    mdi-pencil
                  </v-icon>
                  <v-icon small class="mx-4" @click="deleteTutorial(item)">
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
