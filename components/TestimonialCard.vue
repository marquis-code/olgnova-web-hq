<template>
    <div class="mt-16 lg:mt-24">
      <div class="relative">
        <!-- Testimonial Cards -->
        <div class="relative overflow-hidden">
          <div 
            class="flex transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
          >
            <div
              v-for="(testimonial, index) in testimonials"
              :key="index"
              class="w-full flex-shrink-0"
            >
              <div class="relative rounded-3xl bg-[#3A6E9F]/5 p-8 lg:p-12 mx-2">
                <div class="absolute top-0 right-0 -mt-4 -mr-4">
                  <svg class="h-16 w-16 text-[#3A6E9F]/20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                
                <blockquote class="text-xl/8 font-medium text-gray-900 italic">
                  <svg class="inline" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256">
                    <path d="M100,56H40A16,16,0,0,0,24,72v64a16,16,0,0,0,16,16h60v8a32,32,0,0,1-32,32,8,8,0,0,0,0,16,48.05,48.05,0,0,0,48-48V72A16,16,0,0,0,100,56Zm0,80H40V72h60ZM216,56H156a16,16,0,0,0-16,16v64a16,16,0,0,0,16,16h60v8a32,32,0,0,1-32,32,8,8,0,0,0,0,16,48.05,48.05,0,0,0,48-48V72A16,16,0,0,0,216,56Zm0,80H156V72h60Z"></path>
                  </svg>
                  {{ testimonial.quote }}
                  <svg class="inline" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256">
                    <path d="M100,56H40A16,16,0,0,0,24,72v64a16,16,0,0,0,16,16h60v8a32,32,0,0,1-32,32,8,8,0,0,0,0,16,48.05,48.05,0,0,0,48-48V72A16,16,0,0,0,100,56Zm0,80H40V72h60ZM216,56H156a16,16,0,0,0-16,16v64a16,16,0,0,0,16,16h60v8a32,32,0,0,1-32,32,8,8,0,0,0,0,16,48.05,48.05,0,0,0,48-48V72A16,16,0,0,0,216,56Zm0,80H156V72h60Z"></path>
                  </svg>
                </blockquote>
                
                <div class="mt-8 flex items-center gap-x-4">
                  <img :src="testimonial.image" :alt="testimonial.name" class="h-12 w-12 rounded-full object-cover">
                  <div>
                    <div class="font-semibold text-gray-900">{{ testimonial.name }}</div>
                    <div class="text-sm text-gray-600">{{ testimonial.title }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Navigation Arrows -->
        <button
          @click="previousSlide"
          class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors duration-200"
          :disabled="currentIndex === 0 && !autoLoop"
        >
          <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
  
        <button
          @click="nextSlide"
          class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors duration-200"
          :disabled="currentIndex === testimonials.length - 1 && !autoLoop"
        >
          <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
  
        <!-- Dots Indicator -->
        <div class="flex justify-center mt-8 space-x-2">
          <button
            v-for="(testimonial, index) in testimonials"
            :key="index"
            @click="currentIndex = index"
            class="w-3 h-3 rounded-full transition-colors duration-200"
            :class="index === currentIndex ? 'bg-[#3A6E9F]' : 'bg-gray-300'"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
    import peace from "@/assets/img/team-members7.jpeg"
      import seun from "@/assets/img/team-members8.jpeg"
  interface Testimonial {
    quote: string
    name: string
    title: string
    image: string
  }
  
  // Testimonials data
  const testimonials: Testimonial[] = [
    {
      quote: "OLGNova's insights transformed the way we engage with our stakeholders. Their support was instrumental in aligning our strategy with real community needs.",
      name: "Peace Iraguha",
      title: "Chief Operations Officer, Lifesten Health Rwanda",
      image: peace
    },
    {
      quote: "OLGNova is supporting us in studying disinformation as we uncover how it is experienced, amplified, and internalised, particularly in communities often overlooked in global discourse. Through our collaboration with their team, we hope to empower platforms, policymakers, and the public with evidence that drives meaningful change.",
      name: "Seun Durojaiye",
      title: "Founder and Editor, Social Voices",
      image: seun
    }
  ]
  
  // Reactive state
  const currentIndex = ref(0)
  const autoLoop = ref(true)
  const intervalDuration = ref(5000) // 5 seconds
  
  let slideInterval: NodeJS.Timeout | null = null
  
  // Navigation methods
  const nextSlide = () => {
    if (currentIndex.value < testimonials.length - 1) {
      currentIndex.value++
    } else if (autoLoop.value) {
      currentIndex.value = 0
    }
  }
  
  const previousSlide = () => {
    if (currentIndex.value > 0) {
      currentIndex.value--
    } else if (autoLoop.value) {
      currentIndex.value = testimonials.length - 1
    }
  }
  
  // Auto-slide functionality
  const startAutoSlide = () => {
    if (slideInterval) clearInterval(slideInterval)
    slideInterval = setInterval(() => {
      nextSlide()
    }, intervalDuration.value)
  }
  
  const stopAutoSlide = () => {
    if (slideInterval) {
      clearInterval(slideInterval)
      slideInterval = null
    }
  }
  
  // Lifecycle hooks
  onMounted(() => {
    if (autoLoop.value) {
      startAutoSlide()
    }
  })
  
  onUnmounted(() => {
    stopAutoSlide()
  })
  
  // Pause auto-slide on hover
  const pauseOnHover = () => {
    if (autoLoop.value) {
      stopAutoSlide()
    }
  }
  
  const resumeOnLeave = () => {
    if (autoLoop.value) {
      startAutoSlide()
    }
  }
  
  // Watch for changes in autoLoop setting
  watch(autoLoop, (newValue) => {
    if (newValue) {
      startAutoSlide()
    } else {
      stopAutoSlide()
    }
  })
  
  // Add event listeners for hover pause/resume
  onMounted(() => {
    const carousel = document.querySelector('.testimonial-carousel')
    if (carousel) {
      carousel.addEventListener('mouseenter', pauseOnHover)
      carousel.addEventListener('mouseleave', resumeOnLeave)
    }
  })
  </script>
  
  <style scoped>
  .testimonial-carousel {
    /* Container class for event listeners */
  }</style>