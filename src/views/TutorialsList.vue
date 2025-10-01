<script setup>
import TutorialServices from "../services/tutorialServices";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const tutorials = ref([]);

const message = ref("Search, Add, Edit or Delete Courses");

const editTutorial = (tutorial) => {
  router.push({ name: "edit", params: { id: tutorial.id } });
};

const viewTutorial = (tutorial) => {
  router.push({ name: "view", params: { id: tutorial.id } });
};

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
      tutorials.value = response.data;
    })
    .catch((e) => {
      message.value = e.response.data.message;
    });
};

retrieveTutorials();
</script>

<template>
  <div>
    <v-container>

      <br /><br />
      <v-card>
        <v-card-title> Courses </v-card-title>
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
            <tr v-for="(item, index) in tutorials" :key="item.id">
              <td>{{ item.dept }}</td>
              <td>{{ item.courseNo }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.level }}</td>
              <td>{{ item.hour }}</td>
              <td>{{ item.description }}</td>
              <td>
                <v-icon small class="mx-4" @click="editTutorial(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small class="mx-4" @click="viewTutorial(item)">
                  mdi-format-list-bulleted-type
                </v-icon>
                <v-icon small class="mx-4" @click="deleteTutorial(item)">
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
