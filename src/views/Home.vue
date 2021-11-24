<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <!-- logo -->
      <v-container>
        <v-img
          class="mx-auto"
          :src="siteInfo.logo_url"
          height="200"
          width="200"
        />
      </v-container>

      <!-- title and tagline -->
      <v-container>
        <h1>{{ siteInfo.title }}</h1>
        <h3>{{ siteInfo.tagline }}</h3>
      </v-container>

      <!-- social links -->
      <v-container class="d-flex flex-wrap justify-center">
        <v-btn
          v-for="social in socialLinks"
          :key="social.id"
          class="mx-2"
          icon
          :href="social.url"
          target="_blank"
        >
          <v-icon>{{ social.icon }}</v-icon>
        </v-btn>
      </v-container>

      <v-container>
        <v-btn
          rounded
          color="secondary"
          text-color="#000000"
          dark
          :href="siteInfo.hire_me_url"
          target="_blank"
          class="mx-2"
        >
          <v-icon class="mr-2">mdi-currency-usd</v-icon> Hire Me
        </v-btn>

        <v-btn
          rounded
          color="primary"
          text-color="#000000"
          dark
          :href="siteInfo.resume_url"
          target="_blank"
          class="mx-2"
        >
          <v-icon class="mr-2">mdi-cloud-download</v-icon> Resume
        </v-btn>
      </v-container>

      <v-container>
        <h2>Some of my skills:</h2>
        <v-container class="d-flex flex-wrap justify-center">
          <v-chip
            v-for="skill in skills"
            :key="skill.id"
            class="ma-2"
            :color="skill.colour"
            text-color="#000000"
          >
            {{ skill.name }}
          </v-chip>
        </v-container>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      siteInfo: {},
      socialLinks: [],
      skills: [],
    };
  },
  methods: {
    async fetchFromDirectus(collectionName, params) {
      const res = await axios.get(
        `https://api.atridad.dev/items/${collectionName}?${params}`
      );
      return res.data.data;
    },
  },
  async mounted() {
    const siteInfo = await this.fetchFromDirectus("site_info");
    this.siteInfo = siteInfo;

    const socialLinks = await this.fetchFromDirectus("social_links", "sort=sort");
    this.socialLinks = socialLinks;

    const skills = await this.fetchFromDirectus("skills", "sort=sort");
    this.skills = skills;
  },
};
</script>
