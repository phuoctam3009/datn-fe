<i18n>
{
    "en": {
        "sections": {
            "1": {
                "title": "Software Development Company",
                "subtitle": "We provide advanced software solutions, services and platforms that empowers e-business industry workers in the Middle East."
            },
            "about": {
                "title": "About Us",
                "subtitle": "Who we are and What are our goals1.",
                "row1": {
                    "title": "who we are, What we do, and What are our goals?",
                    "content": "EBMSoft is a software and technology development company that develops and owns several advanced systems and projects aimed at supporting and developing e-business, developing its mechanism of work and making a breakthrough in the way businesses use modern technology. The company also provides services and platforms that help and solve the problems of workers of any e-business industry in the Middle East. And the Arab world."
                },
                "row2": {
                    "title": "We develop custom softwares and technology!",
                    "content": "EBMSoft's team uses the latest programming and design techniques to develop websites, systems, Android and IOS applications, as well as computer programs, which enables us to implement ideas and innovations in a custom fashion and launch modern, fast, and powerful platforms that include features unprecedented in other systems in the Middle East and the Arab world!"
                }
            },
            "contact": {
                "subtitle": "Leave us a message and we'll reply as soon as possible"
            },
            "timeline": {
                "title": "Timeline of our history",
                "subtitle": "the most important dates and events in EBMSoft's history"
            },
            "products": {
                "title": "Our Products & Projects",
                "subtitle": "Platforms, Services and Solutions that are developed and managed by EBMSoft"
            },
            "industries": {
                "title": "Industries We Develop",
                "subtitle": "Industries that we are currently working on developing it and providing software solutions to solve their problems.",
                "cols": [
                    {
                        "headline": "E-Commerce",
                        "description": "We are working to develop and operate projects and platforms that provide solutions for the e-commerce and its workers those working, which helps the seller in reaching the buyer as well as the buyer in reaching a better product."
                    },
                    {
                        "headline": "Financial Tech",
                        "description": "We are working on developing platforms, software and solutions for Financial Technology and Money Transfer that faces many problems in the Middle East, specifically the Arab world."
                    },
                    {
                        "headline": "Business Managment",
                        "description": "We are working on programming and developing advanced software solutions that helps companies and Businesses in Management and Accounting by using modern technology"
                    }
                ]
            },
            "actions": {
                "contact": "Contact Us",
                "about": "More About Us",
                "products": "Our Products"
            }
        },
        "timeline": [
            {
                "title": "Founding EBMSoft for Software Development",
                "content": "EBMSoft was founded to develop and provide advanced software solutions that empowers e-business industry workers and take people to the digital area in the Middle East."
            },
            {
                "date": "Soon",
                "title": "Launching the first system / platform",
                "content": "Launching the first system and platform developed by EBMSoft for e-commerce industry workers to provide better and modern solutions and solve the problems of this industry in the Middle East."
            }
        ],
        "contact": {
            "subheader": "or contact us via:",
            "email": "Email Address",
            "facebook": "Facebook Page",
            "website": "Website"
        }
    }
}
</i18n>
<template>
  <div class="page page-sections">
    <section
      id="headerSection"
      data-section="home"
      class="header-section dark-gradient fullpage-section"
    >
      <animated-background />
      <v-container
        v-if="!loading"
        class="fill-height pt-12"
        :class="{ 'align-center': phoneOnly }"
      >
        <v-slide-y-transition appear>
          <h1 class="strong-text--text">
            <animate-text
              :duration="1500"
              :stop-after="0"
              :delay="500"
              :text="$t('sections.1.title')"
            />
            <!-- <span class="secondary--text font-weight-medium">EBMSOFT</span> -->
          </h1>
        </v-slide-y-transition>
        <v-slide-x-transition appear>
          <h2 class="text--text mt-5">
            <animate-text
              @done="showSection1Actions = true"
              :duration="2500"
              :delay="2000"
              :text="$t('sections.1.subtitle')"
            ></animate-text>
            <!-- <div>Information Technology & Electronic Business Company</div> -->
          </h2>
        </v-slide-x-transition>
        <div
          class="actions"
          :class="{
            'fade-up-off': !showSection1Actions,
            'fade-up-on': showSection1Actions,
          }"
        >
          <!-- <v-btn @click="navigateToLink('#productsSection')" color="strong-text" tile :large="pcOnly" depressed outlined class="me-6">{{$t('sections.actions.products')}}</v-btn> -->
          <v-btn
            @click="navigateToLink('#aboutSection')"
            color="strong-text"
            tile
            :large="pcOnly"
            depressed
            outlined
            class="me-6"
            >{{ $t("sections.actions.about") }}</v-btn
          >
          <v-btn
            @click="navigateToLink('#contactSection')"
            color="secondary"
            tile
            :large="pcOnly"
            outlined
            >{{ $t("sections.actions.contact") }}</v-btn
          >
        </div>
      </v-container>

      <div class="section-scroll-icon">
        <scroll-icon @click="scrollToSection(2)" />
      </div>
    </section>
    <div class="center">
      <header class="section-header">
        <span>LATEST</span>
      </header>
      <h2>Recent jobs</h2>
      <hr />
      <div class="list-job row" v-for="(item, index) in items" :key="index">
        <div class="col-2">
          <img :src="item.avatar" />
        </div>
        <div class="col-7 hgroup">
          <h4>{{ item.title }}</h4>
          <h5>{{ item.company }}</h5>
        </div>
        <div class="col-3 header-meta">
          <span>{{ item.location }}</span>
          <br />
          <span>{{ item.type }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import "particles.js";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles

import AnimateText from "@/components/custom/animate-text";
import ScrollIcon from "@/components/custom/scroll-icon";
import AnimatedBackground from "@/components/custom/animated-background";

import GlobalComputed from "@/helpers/global-computed";
import GlobalMethods from "@/helpers/global-methods";

export default {
  name: "Home",
  components: {
    AnimateText,
    ScrollIcon,
    AnimatedBackground,
  },
  data() {
    return {
      showSection1Actions: false,
      currentScrollTop: 0,

      contactItems: [
        {
          name: "email",
          icon: "mdi-email",
          value: "info@ebmsoft.net",
          color: "primary",
        },
        {
          name: "facebook",
          icon: "mdi-facebook",
          value: "@EBMSoft.net",
          color: "blue darken-1",
          href: "https://facebook.com/ebmsoft.net",
        },
        {
          name: "website",
          icon: "mdi-web",
          value: "www.ebmsoft.net",
          color: "grey",
          href: "https://ebmsoft.net",
        },
      ],
      projects: [
        {
          image: "/img/coming-soon.png",
          title: "EBM Affiliates System",
          subtitle:
            "Advanced and Modern E-commerce platform that helps sellers connect with marketers and affiliates people that have the ability to reach buyers easily by their selling channels",
        },
        {
          image: "/img/coming-soon.png",
          title: "E-Commerce Platform",
          subtitle:
            "E-Commerce Project, we'll publish more info at the right time",
        },
        {
          image: "/img/coming-soon.png",
          title: "E-Commerce Project",
          subtitle:
            "E-commerce Project that will help merchants and small-to-medium stores to start selling online!",
        },
      ],
      teamMembers: [
        {
          name: "Ebrahim Maher",
          job: "Founder, CEO & Developer",
          avatar: "/img/team/ebrahim-maher.jpg",
          description: "Founder and CEO of EBMSoft company ",
        },
      ],
      items: [
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          title: "Senior front-end developer",
          company: "Google",
          location: "Menlo park, CA",
          type: "FULL TIME",
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          title: "Senior front-end developer",
          company: "Google",
          location: "Menlo park, CA",
          type: "FULL TIME",
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          title: "Senior front-end developer",
          company: "Google",
          location: "Menlo park, CA",
          type: "FULL TIME",
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          title: "Senior front-end developer",
          company: "Google",
          location: "Menlo park, CA",
          type: "FULL TIME",
        },
      ],
    };
  },
  computed: {
    industriesCols() {
      return [
        {
          color: "blue",
          icon: "mdi-cart-outline",
          headline: this.$t("sections.industries.cols.0.headline"),
          description: this.$t("sections.industries.cols.0.description"),
        },
        {
          color: "deep-orange",
          icon: "mdi-currency-usd-circle-outline",
          headline: this.$t("sections.industries.cols.1.headline"),
          description: this.$t("sections.industries.cols.1.description"),
        },
        {
          color: "teal",
          icon: "mdi-store",
          headline: this.$t("sections.industries.cols.2.headline"),
          description: this.$t("sections.industries.cols.2.description"),
        },
      ];
    },
    timeline() {
      return [
        {
          date: "27-8-2020",
          title: this.$t("timeline.0.title"),
          content: this.$t("timeline.0.content"),
        },
        {
          date: this.$t("timeline.1.date"),
          title: this.$t("timeline.1.title"),
          content: this.$t("timeline.1.content"),
        },
      ];
    },
    ...GlobalComputed,
  },
  methods: {
    scrollToSection(n) {
      let i = n - 1,
        element = document.querySelectorAll(".page-sections section")[i];
      if (element) {
        this.scrollToElement(element);
      }
    },
    scrollObserver() {
      window.addEventListener("scroll", () => {
        this.currentScrollTop = document.documentElement.scrollTop;
      });
    },
    handleScrollChange(scrollTop) {
      const sections = document.querySelectorAll(".page-sections section");
      sections.forEach((section) => {
        let offsetTop = section.offsetTop - this.navbarHeight, // decrease navbarHeight
          offsetBottom = offsetTop + section.offsetHeight;

        if (scrollTop >= offsetTop && scrollTop < offsetBottom) {
          let sectionName = section.getAttribute("data-section");
          if (sectionName) {
            this.$store.commit("SET_ACTIVE_SECTION", sectionName);
          }
          // section is visible...
          if (section.getAttribute("data-theme") === "light") {
            if (!this.lightNavbar) {
              this.$store.commit("SET_LIGHT_NAVBAR", true);
            }
          } else {
            if (this.lightNavbar) {
              this.$store.commit("SET_LIGHT_NAVBAR", false);
            }
          }
        }
      });
    },

    ...GlobalMethods,
  },
  watch: {
    currentScrollTop(top) {
      this.handleScrollChange(top);
    },
  },

  mounted() {
    this.scrollObserver();
    AOS.init({
      container: document.documentElement,
      once: true,
      easing: "ease",
    });
  },
};
</script>
<style lang="scss" scoped>
section {
  .container {
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;

    &,
    * {
      z-index: 1;
    }
  }
  &.header-section {
    color: white;
  }
  h1 {
    font-size: 4rem;
    font-weight: 300;

    @media (max-width: 960px) {
      text-align: center;
      font-size: 1.7rem;
      line-height: 2.4rem;
      font-weight: 400;
    }
  }
  h2 {
    font-family: Oswald, sans-serif;
    letter-spacing: 1px;
    margin: 16px 0;
    line-height: 1.4;

    @media (max-width: 960px) {
      text-align: center;
      font-size: 1.3rem;
      font-weight: 300;
    }
  }
  .actions {
    margin-top: 3rem;
    @media (max-width: 960px) {
      margin: 2rem 0;
      width: 100%;
      text-align: center;
      justify-content: center;
    }
    .v-btn {
      @media (min-width: 960px) {
        min-width: 130px;
        min-height: 45px;
      }
    }
  }
  .section-scroll-icon {
    z-index: 2;
    position: absolute;
    bottom: 8%;
    left: 50%;
    transform: translateX(-50%);
  }
}
.center {
  margin: auto;
  width: 60%;
  padding: 0 15px;
  margin-right: auto;
  margin-left: auto;
  .section-header {
    text-align: center;
    margin-bottom: 72px;
    span {
      color: #c8d0d7;
      font-family: Montserrat, sans-serif;
      font-size: 12px;
      letter-spacing: 2px;
      text-transform: uppercase;
    }
  }
}
h2 {
  font-size: 37px;
  text-align: center;
}
</style>