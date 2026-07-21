<script setup>
import { computed, ref } from 'vue'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { Download } from 'lucide-vue-next'

const props = defineProps({
  fullName: {
    type: String,
    default: 'ForgeX Team Member',
  },
  role: {
    type: String,
    default: 'Team Member',
  },
  department: {
    type: String,
    default: 'ForgeX Digital',
  },
})

const certificateElement = ref(null)
const downloading = ref(false)

const issuedDate = new Intl.DateTimeFormat('en-MY', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
}).format(new Date())

const certificateId = computed(() => {
  const namePart = props.fullName
    .replace(/[^a-zA-Z]/g, '')
    .slice(0, 4)
    .toUpperCase()

  return `FX-${namePart || 'USER'}-2026`
})

async function downloadCertificate() {
  if (!certificateElement.value) return

  downloading.value = true

  try {
    const canvas = await html2canvas(certificateElement.value, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
    })

    const imageData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('portrait', 'mm', 'a4')

    pdf.addImage(imageData, 'PNG', 0, 0, 210, 297)
    pdf.save(`ForgeX-Certificate-${props.fullName.replace(/\s+/g, '-')}.pdf`)
  } finally {
    downloading.value = false
  }
}
</script>

<template>
  <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p class="text-sm font-medium text-slate-500">Recognition</p>
        <h3 class="mt-1 text-lg font-bold text-core-950">
          Certificate of achievement
        </h3>
        <p class="mt-1 text-sm text-slate-500">
          Download your personalized ForgeX Digital certificate.
        </p>
      </div>

      <button
        type="button"
        :disabled="downloading"
        class="inline-flex items-center justify-center gap-2 rounded-lg bg-core-blue px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        @click="downloadCertificate"
      >
        <Download class="size-4" />
        {{ downloading ? 'Creating PDF...' : 'Download PDF' }}
      </button>
    </div>

    <div class="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 p-3 sm:p-6">
      <article ref="certificateElement" class="certificate">
        <div class="top-shape"></div>
        <div class="top-gold-ribbon"></div>
        <div class="bottom-shape"></div>
        <div class="bottom-gold-ribbon"></div>

        <div class="certificate-seal">
          <div class="seal-inner">★</div>
          <span class="seal-left"></span>
          <span class="seal-right"></span>
        </div>

        <div class="certificate-content">
          <p class="certificate-brand">FORGEX DIGITAL</p>

          <h4>CERTIFICATE</h4>
          <p class="certificate-subtitle">OF ACHIEVEMENT</p>

          <div class="certificate-copy">
            <p>This certificate is proudly awarded to</p>
            <h5>{{ fullName }}</h5>
            <p class="certificate-description">
              In recognition of exceptional contribution and dedication as
              <strong>{{ role }}</strong> in the {{ department }} team.
            </p>
          </div>

          <div class="certificate-footer">
            <div>
              <div class="signature-line"></div>
              <p class="signature-name">Aisha Farid</p>
              <p class="signature-role">Chief Executive Officer</p>
            </div>

            <div class="certificate-meta">
              <p><strong>Certificate ID:</strong> {{ certificateId }}</p>
              <p><strong>Issued:</strong> {{ issuedDate }}</p>
            </div>

            <div>
              <div class="signature-line"></div>
              <p class="signature-name">Daniel Rahman</p>
              <p class="signature-role">Operations Director</p>
            </div>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.certificate {
  position: relative;
  width: 100%;
  aspect-ratio: 210 / 297;
  overflow: hidden;
  background: #ffffff;
  color: #18212f;
  font-family: Arial, sans-serif;
}

.certificate-content {
  position: relative;
  z-index: 2;
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  padding: 10% 10% 8%;
  text-align: center;
}

.certificate-brand {
  margin: 0;
  color: #0e6175;
  font-size: clamp(6px, 1vw, 12px);
  font-weight: 800;
  letter-spacing: 0.22em;
}

.certificate h4 {
  margin: 12% 0 0;
  color: #0e6175;
  font-size: clamp(24px, 5vw, 62px);
  font-weight: 800;
  letter-spacing: 0.08em;
}

.certificate-subtitle {
  margin: 1% 0 0;
  font-size: clamp(8px, 1.6vw, 20px);
  letter-spacing: 0.2em;
}

.certificate-copy {
  margin-top: 14%;
}

.certificate-copy > p:first-child {
  margin: 0;
  font-size: clamp(7px, 1.4vw, 17px);
  font-weight: 700;
}

.certificate-copy h5 {
  margin: 6% 0;
  color: #0e6175;
  font-family: Georgia, serif;
  font-size: clamp(20px, 4.3vw, 52px);
  font-style: italic;
  font-weight: 500;
}

.certificate-description {
  max-width: 78%;
  margin: 0 auto;
  font-size: clamp(7px, 1.25vw, 15px);
  line-height: 1.7;
}

.certificate-footer {
  display: grid;
  width: 100%;
  margin-top: auto;
  grid-template-columns: 1fr 1.1fr 1fr;
  align-items: end;
  gap: 5%;
}

.signature-line {
  border-top: 1px solid #1d2939;
}

.signature-name {
  margin: 4% 0 0;
  font-family: Georgia, serif;
  font-size: clamp(7px, 1.2vw, 15px);
  font-weight: 700;
}

.signature-role,
.certificate-meta {
  margin: 3% 0 0;
  font-size: clamp(5px, 0.9vw, 10px);
  line-height: 1.6;
}

.certificate-meta {
  color: #475467;
}

.top-shape,
.bottom-shape {
  position: absolute;
  z-index: 0;
  width: 68%;
  height: 18%;
  background: #187589;
}

.top-shape {
  top: 0;
  left: 0;
  clip-path: polygon(0 0, 100% 0, 0 100%);
}

.bottom-shape {
  right: 0;
  bottom: 0;
  clip-path: polygon(100% 0, 100% 100%, 0 100%);
}

.top-gold-ribbon,
.bottom-gold-ribbon {
  position: absolute;
  z-index: 1;
  width: 73%;
  height: 2.5%;
  background: linear-gradient(90deg, #b57c17, #ffe07a, #b57c17);
  transform: rotate(-29deg);
}

.top-gold-ribbon {
  top: 10%;
  left: -14%;
}

.bottom-gold-ribbon {
  right: -14%;
  bottom: 10%;
}

.certificate-seal {
  position: absolute;
  z-index: 3;
  top: 6%;
  right: 10%;
  width: 12%;
  aspect-ratio: 1;
  border: 5px solid #d89a16;
  border-radius: 50%;
  background: #f7c62e;
  box-shadow: 0 0 0 4px #ffdf65;
}

.seal-inner {
  display: grid;
  width: 100%;
  height: 100%;
  place-items: center;
  color: #ffffff;
  font-size: clamp(13px, 2.8vw, 34px);
}

.seal-left,
.seal-right {
  position: absolute;
  top: 80%;
  width: 35%;
  height: 70%;
  background: #e8ad20;
}

.seal-left {
  left: 9%;
  transform: rotate(16deg);
  transform-origin: top;
}

.seal-right {
  right: 9%;
  transform: rotate(-16deg);
  transform-origin: top;
}
</style>