<template>
  <div>
    <h1 class="text-5xl font-black text-center">Hi, I'm Atridad!</h1>
    <h2 class="text-xl font-black text-center">(he/him)</h2>

    <nuxt-img
      class="rounded-lg mx-auto my-6"
      src="/logo.webp"
      width="250"
      height="250"
    />

    <div class="flex flex-wrap justify-center items-center space-x-3 m-6">
      <a class="group" href="https://git.atridad.dev/atridad" target="_blank"><IconGitPullRequest class="group-hover:text-pink-600" :size="32" /></a>
      <a class="group" href="mailto:atridad@icloud.com" target="_blank"><IconMail class="group-hover:text-pink-600" :size="32" /></a>
    </div>

    <h3 class="text-l font-black text-center m-6">Freelance Software Engineer, Sysadmin, and Certified Nerd</h3>

    <h2 class="text-3xl font-black text-center m-6">Posts:</h2>

    <div class="mx-auto my-6">
      <PostPreview v-for="post in posts" :key="post.slug" :post="post" class="hover:text-pink-600"></PostPreview>
    </div>

    <h2 class="text-xl font-black text-center m-6">[Testing] Site Feedback:</h2>

    <div class="flex flex-wrap justify-center items-center space-x-3 m-6">
        <a @click="sendReaction(1)" class="no-underline inline-block text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-pink-600 hover:text-pink-600 mt-4 sm:mt-0"><IconThumbsUp :size="16" /> {{ this.thumbsUp }}</a>
        <a @click="sendReaction(0)" class="no-underline inline-block text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-pink-600 hover:text-pink-600 mt-4 sm:mt-0"><IconThumbsDown :size="16" />{{ this.thumbsDown }}</a>
    </div>
  </div>
</template>

<script>
import { Appwrite, Query } from "appwrite";

export default {
  async asyncData({ $content }) {
    const posts = await $content()
      .only(['title', 'slug', 'date'])
      .sortBy('date', 'desc')
      .fetch()
      
    // console.log("posts", posts)

    return {
      posts,
    }
  },
  data() {
    return {
      thumbsUp: 0,
      thumbsDown: 0,
      sdk: null,
    };
  },
  async mounted() {
    const sdk = new Appwrite();
    sdk.setEndpoint('https://api.atridad.dev/v1').setProject('61f0f6767e260ddd3b4d');

    this.sdk = sdk;

    try {
      console.log("Logged In")
      await sdk.account.get();
    } catch(error) {
      console.log("ANON")
      await sdk.account.createAnonymousSession();
    }

    sdk.database.listDocuments('61f79ec91525bc79ecfc', [Query.equal('value', 1)]).then((res) => {
      this.thumbsUp = res.documents.length;
    });

    sdk.database.listDocuments('61f79ec91525bc79ecfc', [Query.equal('value', 0)]).then((res) => {
      this.thumbsDown = res.documents.length;
    });

    sdk.subscribe('collections.61f79ec91525bc79ecfc.documents', response => {
      (response.payload.value === 1) ? this.thumbsUp++ : this.thumbsDown++;
    });
  },
  methods: {
    sendReaction(reaction) {
      this.sdk.database.createDocument('61f37f8fe473a300c758', 'unique()', {
        value: reaction
      });
    }
  }
}
</script>
