<template>
  <div class="resume">
    <div class="leftCol m_box" ref="leftCol">
      <div class="shadow"></div>
      <div class="heading" id="myselfpic"></div>
      <div
        class="section-headline"
        contenteditable=""
        @blur="onInput($event, 'person.information')"
      >
        {{ person.information }}
      </div>
      <div v-if="person.birth" class="item">
        <div class="icon">
          <i class="material-icons">account_circle</i>
        </div>
        <div class="text">
          <ul>
            <li>
              <span
                contenteditable=""
                @blur="onInput($event, 'person.birth.year')"
                >{{ person.birth.year }}</span
              >
            </li>
          </ul>
        </div>
      </div>

      <div class="item">
        <div class="icon">
          <i class="material-icons">location_city</i>
        </div>
        <div class="text">
          <ul>
            <li>
              <span
                contenteditable=""
                @blur="onInput($event, 'person.contact.city')"
              >
                {{ person.contact.city }}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div class="item">
        <div class="icon">
          <i class="material-icons">phone</i>
        </div>
        <div class="text">
          <span
            contenteditable=""
            @blur="onInput($event, 'person.contact.phone')"
          >
            {{ person.contact.phone }}
          </span>
        </div>
      </div>

      <div class="item">
        <div class="icon">
          <i class="material-icons">email</i>
        </div>
        <div class="text">
          <span
            contenteditable=""
            @blur="onInput($event, 'person.contact.email')"
          >
            {{ person.contact.email }}
          </span>
        </div>
      </div>

      <div class="item">
        <div class="icon">
          <i class="material-icons">language</i>
        </div>
        <div class="text">
          <span
            contenteditable=""
            @blur="onInput($event, 'person.contact.website')"
            >{{ person.contact.website }}</span
          >
        </div>
      </div>
      <draggable
        v-model="itemsLeft"
        group="itemsLeft"
        @start="drag = true"
        @end="drag = false"
      >
        <div v-for="(item, key) in itemsLeft" :key="key" class="item-right">
          <div v-if="item.className == 'skills' && item.active">
            <div class="item">
              <div
                contenteditable="true"
                @blur="onInput($event, 'itemsLeft[' + key + '].name')"
                class="section-headline"
              >
                {{ item.name }}
              </div>
              <div class="skill" v-for="skill in item.items" :key="skill.name">
                <div class="right">
                  <span>{{ skill.name }}&nbsp;</span>
                  <div class="progress">
                    <div
                      class="determinate"
                      :style="'width: ' + skill.level + '%;'"
                    >
                      <i class="fa fa-circle"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="item.className == 'hobbies' && item.active">
            <div class="item last">
              <div
                class="section-headline"
                contenteditable=""
                @blur="onInput($event, 'itemsLeft[' + key + '].name')"
              >
                {{ item.name }}
              </div>

              <div
                class="right"
                v-for="(hobby, index) in item.items"
                :key="index"
              >
                -
                <span
                  contenteditable=""
                  @blur="
                    onInput(
                      $event,
                      'itemsLeft[' + key + '].items[' + index + '].name'
                    )
                  "
                  >{{ hobby.name }}</span
                >
              </div>

              <!-- <div v-if="person.knowledge" class="skill">
                <div class="right">
                  <span>{{ person.knowledge }}</span>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </draggable>
    </div>

    <div class="rightCol" ref="rightCol">
      <div class="title">
        <h2 contenteditable @blur="onInput($event, 'person.name')">
          {{ person.name }}
        </h2>
        <div
          contenteditable=""
          class="description"
          @blur="onInput($event, 'person.position')"
        >
          {{ person.position }}
        </div>
        <span
          contenteditable
          class="about"
          @blur="onInput($event, 'person.about')"
          >{{ person.about }}</span
        >
      </div>
      <draggable
        v-model="itemsRight"
        group="itemsRight"
        @start="drag = true"
        @end="drag = false"
      >
        <div v-for="(item, key) in itemsRight" :key="key" class="item-right">
          <div v-if="item.className == 'experience' && item.active">
            <div
              contenteditable=""
              :class="'section-headline ' + [item.className]"
              @blur="onInput($event, 'itemsRight[' + key + '].name')"
            >
              {{ item.name }}
            </div>
            <draggable
              v-modal="item.items"
              :group="item.name"
              @start="drag = true"
              @end="drag = false"
            >
              <div
                class="block"
                v-for="(item, index) in item.items"
                :key="index"
              >
                <div class="block-helper"></div>
                <h3
                  contenteditable
                  class="headline"
                  style="font-weight: bold"
                  @blur="
                    onInput(
                      $event,
                      'itemsRight[' + key + '].items[' + index + '].position'
                    )
                  "
                >
                  {{ item.position }}
                </h3>
                <h4
                  contenteditable
                  @blur="
                    onInput(
                      $event,
                      'itemsRight[' + key + '].items[' + index + '].nameCompany'
                    )
                  "
                >
                  {{ item.nameCompany }}
                </h4>
                <div
                  contenteditable
                  class="subheadline"
                  @blur="
                    onInput(
                      $event,
                      'itemsRight[' + key + '].items[' + index + '].timeperiod'
                    )
                  "
                >
                  {{ item.timeperiod }}
                </div>
                <p
                  contenteditable
                  class="info"
                  @blur="
                    onInput(
                      $event,
                      'itemsRight[' + key + '].items[' + index + '].description'
                    )
                  "
                >
                  {{ item.description }}
                </p>
              </div>
            </draggable>
          </div>
          <div v-if="item.className == 'education' && item.active">
            <div
              contenteditable=""
              :class="'section-headline ' + [item.className]"
              @blur="onInput($event, 'itemsRight[' + key + '].name')"
            >
              {{ item.name }}
            </div>
            <draggable
              v-modal="item.items"
              :group="item.name"
              @start="drag = true"
              @end="drag = false"
            >
              <div
                class="block"
                v-for="(item, index) in item.items"
                :key="index"
              >
                <div class="block-helper"></div>
                <h3
                  contenteditable
                  class="headline"
                  @blur="
                    onInput(
                      $event,
                      'itemsRight[' +
                        key +
                        '].items[' +
                        index +
                        '].nameUniversity'
                    )
                  "
                >
                  {{ item.nameUniversity }}
                </h3>
                <h4
                  contenteditable
                  @blur="
                    onInput(
                      $event,
                      'itemsRight[' + key + '].items[' + index + '].degree'
                    )
                  "
                >
                  {{ item.degree }}
                </h4>
                <div
                  contenteditable
                  class="subheadline"
                  @blur="
                    onInput(
                      $event,
                      'itemsRight[' + key + '].items[' + index + '].timeperiod'
                    )
                  "
                >
                  {{ item.timeperiod }}
                </div>
                <p
                  contenteditable
                  class="info"
                  @blur="
                    onInput(
                      $event,
                      'itemsRight[' + key + '].items[' + index + '].description'
                    )
                  "
                >
                  {{ item.description }}
                </p>
              </div>
            </draggable>
          </div>
          <div v-if="item.className == 'activities' && item.active">
            <div
              contenteditable=""
              :class="'section-headline ' + [item.className]"
              @blur="onInput($event, 'itemsRight[' + key + '].name')"
            >
              {{ item.name }}
            </div>
            <draggable
              v-modal="item.items"
              :group="item.name"
              @start="drag = true"
              @end="drag = false"
            >
              <div
                class="block"
                v-for="(item, index) in item.items"
                :key="index"
              >
                <div class="block-helper"></div>
                <h3
                  contenteditable
                  class="headline"
                  style="font-weight: bold"
                  @blur="
                    onInput(
                      $event,
                      'itemsRight[' + key + '].items[' + index + '].role'
                    )
                  "
                >
                  {{ item.role }}
                </h3>
                <h4
                  contenteditable
                  @blur="
                    onInput(
                      $event,
                      'itemsRight[' +
                        key +
                        '].items[' +
                        index +
                        '].organizationName'
                    )
                  "
                >
                  {{ item.organizationName }}
                </h4>
                <div
                  contenteditable
                  class="subheadline"
                  @blur="
                    onInput(
                      $event,
                      'itemsRight[' + key + '].items[' + index + '].timeperiod'
                    )
                  "
                >
                  {{ item.timeperiod }}
                </div>
                <p
                  contenteditable
                  class="info"
                  @blur="
                    onInput(
                      $event,
                      'itemsRight[' + key + '].items[' + index + '].description'
                    )
                  "
                >
                  {{ item.description }}
                </p>
              </div>
            </draggable>
          </div>
          <div v-if="item.className == 'awards' && item.active">
            <div
              contenteditable=""
              :class="'section-headline ' + [item.className]"
              @blur="onInput($event, 'itemsRight[' + key + '].name')"
            >
              {{ item.name }}
            </div>
            <draggable
              v-modal="item.items"
              :group="item.name"
              @start="drag = true"
              @end="drag = false"
            >
              <div
                class="block"
                v-for="(item, index) in item.items"
                :key="index"
              >
                <div class="block-helper"></div>
                <h3
                  contenteditable
                  class="headline"
                  style="font-weight: bold"
                  @blur="
                    onInput(
                      $event,
                      'itemsRight[' + key + '].items[' + index + '].timeperiod'
                    )
                  "
                >
                  {{ item.timeperiod }} :
                </h3>
                <p
                  contenteditable
                  class="info"
                  @blur="
                    onInput(
                      $event,
                      'itemsRight[' + key + '].items[' + index + '].description'
                    )
                  "
                >
                  {{ item.description }}
                </p>
              </div>
            </draggable>
          </div>
        </div>
      </draggable>
    </div>

    <div style="clear: both"></div>
  </div>
</template>

<script>
import Vue from "vue";
import { getVueOptions } from "./options";
const name = "material-dark";

export default Vue.component(name, getVueOptions(name));
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.resume {
  //   font-family:'Roboto' !important;
  //   height: auto;
  position: relative;
  margin-left: 10px;
  background: #cccccc;
  .leftCol {
    height: 100%;
    min-height: unquote("-webkit-calc(100vh - 64px)");
    width: 35%;
    height: 100%;
    float: left;
    padding: 0;
    text-align: left;
    color: #ffffff;
    color: rgba(255, 255, 255, 0.59);
    background-color: #16151c;
    overflow: hidden;
    display: block;
    .section-headline {
      color: rgba(255, 255, 255, 0.54);
    }
    a {
      color: rgba(255, 255, 255, 0.59);
      text-decoration: none;
    }
    .heading {
      background-color: white;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      position: relative;
      width: 100%;
      height: 277px;
    }
    .item {
      width: 100%;
      margin-top: 13px;
      float: left;
      .fa,
      .material-icons {
        display: inherit;
        text-align: center;
      }
      .icon {
        width: 20%;
        float: left;
      }
      .text {
        float: right;
        width: 69%;
        padding-right: 10%;
        padding-top: 0;
        display: block;
        font-size: 15px;
        font-weight: 300;
        background-color: inherit !important;

        li {
          padding-top: 0;
          display: block;
          font-size: 15px;
          font-weight: 300;
        }
      }
      span {
        font-weight: 300;
      }
      .skill {
        clear: both;
        width: 97%;
        padding-top: 4px;
        span {
          font-size: 13px;
        }
        .left {
          float: left;
          width: 10%;
          padding-top: 3px;
          i:nth-child(2) {
            float: left;
            padding-top: 4px;
          }
        }
        .right {
          float: right;
          width: 93%;
          .progress {
            float: left;
            position: relative;
            height: 2px;
            display: block;
            width: 95%;
            background-color: rgba(255, 255, 255, 0.19);
            border-radius: 2px;
            margin: 0.5rem 0 1rem;
            overflow: visible;
            margin-bottom: 10px;
            .determinate {
              background-color: #78909c;
              position: absolute;
              top: 0;
              bottom: 0;
              .fa,
              .material-icons {
                font-size: 13px;
                position: absolute;
                top: -4px;
                right: -2px;
                margin-left: 50%;
                color: white;
              }
            }
          }
        }
      }
    }
    .item.last {
      .text {
        border-bottom-style: none;
        padding-bottom: 0;
      }

      .section-headline {
        margin-top: 0 !important;
      }
      .right {
        padding-left: 20px;
      }
    }
  }
}
a {
  color: inherit;
  cursor: pointer;
  text-decoration-line: none;

  &:visited {
    color: inherit;
  }
}
.description-personal {
  margin-left: 20px;
  margin-top: 20px;
  padding-right: 40px;
  text-align: justify;
  font-family: Roboto;
}
.title {
  right: 25px;
  padding-left: 20px;
  padding-top: 10px;
  padding-right: 10px;
  bottom: 25px;
  h2 {
    text-transform: uppercase;
    display: block;
    font-size: 1.17em;
    -webkit-margin-before: 1em;
    -webkit-margin-after: 1em;
    -webkit-margin-start: 0;
    -webkit-margin-end: 0;
    color: white;
    color: rgba(0, 0, 0, 0.7);
    padding-top: 0;
    margin-top: 0;
    letter-spacing: 10px;
    font-weight: 400;
  }
  div {
    margin-top: -5px;
    margin-top: 0;
    margin: 0;
    padding: 0;
    line-height: 15pt;
    font-weight: 300;
    font-weight: 500;
    letter-spacing: 2px;
    letter-spacing: 3px;
    color: white;
    color: #16151c;
    color: rgba(63, 61, 60, 0.71);
    display: block;
    font-size: 0.67em;
    font-size: 10pt;
    -webkit-margin-before: 2.33em;
    -webkit-margin-start: 0;
    -webkit-margin-end: 0;
    padding-top: 0;
    text-transform: uppercase;
    opacity: 0.8;
  }
  .description {
    margin-top: -20px;
    margin-bottom: 20px;
  }
}
.section-headline {
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 3px;
  font-size: 10pt;
  opacity: 0.8;
  margin-left: 20px;
  margin-top: 12px;
  margin-bottom: 6px;
  color: #3f3d3c;
}
.c {
  clear: both;
}
li {
  margin: 0;
  padding: 0;
  list-style-type: none;
  padding-top: 9px;
}
ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
p {
  margin-top: 0;
  margin-bottom: 25px;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  font-size: 10pt;
  line-height: 17pt;
}
.m_box {
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
}
.fa,
.material-icons {
  display: inline-block;
  font-style: normal;
  font-weight: normal;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 26px;
}
h1,
h3,
h5,
h6 {
  font-weight: 400;
  margin: 0;
}
h2 {
  font-weight: 400;
  font-weight: 500;
  margin: 0;
  margin: 0;
  font-size: 22pt;
  line-height: 37pt;
}
h4 {
  font-weight: 400;
  margin: 0;
  font-size: 12pt;
  line-height: 20pt;
  opacity: 1;
}
.rightCol {
  width: 63.5%;
  //   position: absolute;
  height: 100%;
  min-height: unquote("-webkit-calc(100vh - 64px)");

  float: right;
  display: flex;
  flex-direction: column;
  .experience {
    margin-top: 40px;
  }
  .about {
    display: block;
    margin-top: 8px !important;
    font-weight: 375;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.541176);
  }
  .block {
    width: 90%;
    position: relative;
    background-color: #ffffff;
    padding: 20px;
    margin-top: 5px;
    margin-bottom: 5px;
    display: inline-block;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16),
      0 2px 10px 0 rgba(0, 0, 0, 0.12);
    .headline {
      font-weight: 300;
      display: block;
      font-size: 15px;
      color: rgba(0, 0, 0, 0.870588);
    }
    .subheadline {
      color: rgba(0, 0, 0, 0.541176);
      display: block;
      font-size: 14px;
      font-weight: 300;
    }
    .info {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.870588);
      margin-bottom: 0;
      padding-top: 20px;
      background-color: white !important;
    }
    .icon {
      width: 16%;
      float: left;
      margin-left: 0;
      .fa,
      .material-icons {
        text-align: center;
        display: block;
        font-size: 30pt;
      }
    }
    .content {
      width: 80%;
      position: absolute;
      height: 96%;
      left: 17%;
      padding-right: 3%;
      text-align: left;
      display: flex;
      flex-direction: column;
      .item {
        border-bottom: 1px solid #bdbdbd;
        flex: 1;
        width: 97%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        text-align: left;
        padding-top: 0;
        span {
          color: #d8ab94;
          margin-top: 0;
          font-size: 10pt;
          line-height: 16pt;
        }
        p {
          margin-top: 5px;
        }
      }
      .item:last-of-type {
        border-bottom-style: none;
        border-bottom-style: none;
      }
    }
  }
}

#myselfpic {
  background-image: url("../../resume/id.jpg");
  color: black;
}
#githubIcon {
  width: 25px;
  padding-left: 17px;
}
[contenteditable="true"]:hover {
  outline: 1pt dashed #77a5cc;
}
[contenteditable="true"]:focus {
  outline: 1pt dashed #77a5cc;
}
.item-right:hover {
  outline: 1pt dashed #77a5cc;
}
.item-right {
  margin-right: 10px;
}
</style>
