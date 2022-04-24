<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const quote = ref("");

onMounted(async () => {
    const res = await axios.get("https://api.atridad.ca/v1/randomQuote");
    quote.value = res.data;
});
</script>

<blockquote class="quote">
<div v-if="!quote" class="spinner"></div>

<div v-else>
    {{ quote.Text }}
    <span class="rengoku-alt">{{ quote.Author }}</span>
</div>
</blockquote>

<style>
.spinner {
    margin: 0 auto;
    border: 6px solid rgba(146, 2, 161, 0.15);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    border-top-color: rgba(146, 2, 161, 0.6);
    animation: rotate calc(1s) linear infinite;
}

@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>

<!-- ---
hero: true
heroQuote: You forgot to use Comic Sans as a font, that's why its erroring.
heroName: Insightful Stackoverflow Commenter
feedOnHomepage: true
--- -->

