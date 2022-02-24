<template>
  <div class="resume" ref="content">
    <v-dialog v-model="dialogAvatar" width="800">
      <v-card class="is-modal-upload-img">
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <div class="hello">
                <picture-input
                  ref="pictureInput"
                  @change="onChange"
                  width="300"
                  height="300"
                  margin="16"
                  accept="image/jpeg,image/png"
                  size="10"
                  buttonClass="btn"
                  :customStrings="{
                    upload: '<h1>Bummer!</h1>',
                    drag: 'Click hoặc kéo thả ảnh để tải lên',
                  }"
                >
                </picture-input>
              </div>
            </v-col>
            <v-col cols="6">
              <img
                style="width: 300px; height: 314px"
                alt="Avatar"
                :src="avatar"
            /></v-col>
          </v-row>
        </v-card-text>
        <v-card-actions style="justify-content: end; margin-right: 10px">
          <v-btn color="success" depressed @click="saveImage"> Lưu </v-btn>
          <v-btn color="error" depressed @click="cancelDialog"> Hủy </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div
      class="resume-title"
      :contenteditable="editable"
      @blur="onInput($event, 'title')"
    >
      {{ title }}
    </div>

    <div class="resume-content" >
      <div class="leftCol m_box" ref="leftCol">
        <div class="shadow"></div>
        <div class="heading" id="myselfpic" @click="openDialogAvatar">
          <img alt="Avatar" :src="avatar" />
        </div>
        <div
          class="section-headline"
          :contenteditable="editable"
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
                  :contenteditable="editable"
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
                  :contenteditable="editable"
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
              :contenteditable="editable"
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
              :contenteditable="editable"
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
              :contenteditable="editable"
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
          <div v-for="(item, key) in itemsLeft" :key="key" class="item-left">
            <div v-if="item.className == 'skills' && item.active">
              <div class="item">
                <div
                  :contenteditable="editable"
                  @blur="onInput($event, 'itemsLeft[' + key + '].name')"
                  class="section-headline"
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
                    v-for="(skill, index) in item.items"
                    :key="index"
                  >
                    <div class="btn-item">
                      <v-btn
                        color="success"
                        @click="addItemLeft(itemsLeft[key])"
                        >Thêm
                      </v-btn>
                      <v-btn
                        color="error"
                        @click="removeItemLeft(itemsLeft[key], index)"
                        v-if="item.items.length > 1"
                        >Xóa
                      </v-btn>
                    </div>
                    <div class="skill-item">
                      <h4
                        :contenteditable="editable"
                        @blur="
                          onInput(
                            $event,
                            'itemsLeft[' + key + '].items[' + index + '].name'
                          )
                        "
                      >
                        {{ skill.name }}
                      </h4>
                      <v-rating
                        @input="
                          onInput(
                            $event,
                            'itemsLeft[' + key + '].items[' + index + '].level'
                          )
                        "
                        v-model="skill.level"
                        color="yellow darken-3"
                        background-color="grey darken-1"
                        empty-icon="$ratingFull"
                        half-increments
                        hover
                        size="22"
                      ></v-rating>
                    </div>
                  </div>
                </draggable>
              </div>
            </div>
            <div v-if="item.className == 'hobbies' && item.active">
              <div class="item last">
                <div
                  class="section-headline"
                  :contenteditable="editable"
                  @blur="onInput($event, 'itemsLeft[' + key + '].name')"
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
                    v-for="(hobby, index) in item.items"
                    :key="index"
                    style="margin: 10px 10px 10px 30px"
                  >
                    <div class="btn-item">
                      <v-btn
                        color="success"
                        @click="addItemLeft(itemsLeft[key])"
                        >Thêm
                      </v-btn>
                      <v-btn
                        color="error"
                        @click="removeItemLeft(itemsLeft[key], index)"
                        v-if="item.items.length > 1"
                        >Xóa
                      </v-btn>
                    </div>
                    <div class="hobby-item">
                      -
                      <span
                        contenteditable=""
                        @blur="
                          onInput(
                            $event,
                            'itemsLeft[' + key + '].items[' + index + '].name'
                          )
                        "
                        style="margin: 10px 20px 20px 10px"
                      >
                        {{ hobby.name }}</span
                      >
                    </div>
                  </div>
                </draggable>
                <!-- <div
                                  class="right"
                                  v-for="(hobby, index) in item.items"
                                  :key="index"
                                > -->
                <!-- <div class="btn-item">
                                                      <v-btn color="success" @click="addItem(itemsRight[key])"
                                                        >Thêm</v-btn
                                                      >
                                                      <v-btn
                                                        color="error"
                                                        @click="removeItem(itemsRight[key], index)"
                                                        v-if="item.items.length > 1"
                                                        >Xóa</v-btn
                                                      >
                                                    </div> -->
                <!-- -
                                  <span
                                    contenteditable=""
                                    @blur="
                                      onInput(
                                        $event,
                                        'itemsLeft[' + key + '].items[' + index + '].name'
                                      )
                                    "
                                    style="margin: 10px 0px"
                                    >{{ hobby.name }}</span
                                  >
                                </div> -->

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
                class="is-not-border"
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
                  v-for="(data, index) in item.items"
                  :key="index"
                >
                  <div class="btn-item">
                    <v-btn color="success" @click="addItem(itemsRight[key])"
                      >Thêm
                    </v-btn>
                    <v-btn
                      color="error"
                      @click="removeItem(itemsRight[key], index)"
                      v-if="item.items.length > 1"
                      >Xóa
                    </v-btn>
                  </div>
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
                    {{ data.position }}
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
                          '].nameCompany'
                      )
                    "
                  >
                    {{ data.nameCompany }}
                  </h4>
                  <div
                    contenteditable
                    class="subheadline"
                    @blur="
                      onInput(
                        $event,
                        'itemsRight[' +
                          key +
                          '].items[' +
                          index +
                          '].timeperiod'
                      )
                    "
                  >
                    {{ data.timeperiod }}
                  </div>
                  <p
                    contenteditable
                    class="info"
                    @blur="
                      onInput(
                        $event,
                        'itemsRight[' +
                          key +
                          '].items[' +
                          index +
                          '].description'
                      )
                    "
                  >
                    {{ data.description }}
                  </p>
                </div>
              </draggable>
            </div>
            <div v-if="item.className == 'education' && item.active">
              <div
                contenteditable=""
                :class="'section-headline ' + [item.className]"
                @blur="onInput($event, 'itemsRight[' + key + '].name')"
                class="is-not-border"
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
                  v-for="(data, index) in item.items"
                  :key="index"
                >
                  <div class="btn-item">
                    <v-btn color="success" @click="addItem(itemsRight[key])"
                      >Thêm
                    </v-btn>
                    <v-btn
                      color="error"
                      @click="removeItem(itemsRight[key], index)"
                      v-if="item.items.length > 1"
                      >Xóa
                    </v-btn>
                  </div>
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
                    {{ data.nameUniversity }}
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
                    {{ data.degree }}
                  </h4>
                  <div
                    contenteditable
                    class="subheadline"
                    @blur="
                      onInput(
                        $event,
                        'itemsRight[' +
                          key +
                          '].items[' +
                          index +
                          '].timeperiod'
                      )
                    "
                  >
                    {{ data.timeperiod }}
                  </div>
                  <p
                    contenteditable
                    class="info"
                    @blur="
                      onInput(
                        $event,
                        'itemsRight[' +
                          key +
                          '].items[' +
                          index +
                          '].description'
                      )
                    "
                  >
                    {{ data.description }}
                  </p>
                </div>
              </draggable>
            </div>
            <div v-if="item.className == 'activities' && item.active">
              <div
                contenteditable=""
                :class="'section-headline ' + [item.className]"
                @blur="onInput($event, 'itemsRight[' + key + '].name')"
                class="is-not-border"
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
                  v-for="(data, index) in item.items"
                  :key="index"
                >
                  <div class="btn-item">
                    <v-btn color="success" @click="addItem(itemsRight[key])"
                      >Thêm
                    </v-btn>
                    <v-btn
                      color="error"
                      @click="removeItem(itemsRight[key], index)"
                      v-if="item.items.length > 1"
                      >Xóa
                    </v-btn>
                  </div>
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
                    {{ data.role }}
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
                    {{ data.organizationName }}
                  </h4>
                  <div
                    contenteditable
                    class="subheadline"
                    @blur="
                      onInput(
                        $event,
                        'itemsRight[' +
                          key +
                          '].items[' +
                          index +
                          '].timeperiod'
                      )
                    "
                  >
                    {{ data.timeperiod }}
                  </div>
                  <p
                    contenteditable
                    class="info"
                    @blur="
                      onInput(
                        $event,
                        'itemsRight[' +
                          key +
                          '].items[' +
                          index +
                          '].description'
                      )
                    "
                  >
                    {{ data.description }}
                  </p>
                </div>
              </draggable>
            </div>
            <div v-if="item.className == 'awards' && item.active">
              <div
                contenteditable=""
                :class="'section-headline ' + [item.className]"
                @blur="onInput($event, 'itemsRight[' + key + '].name')"
                class="is-not-border"
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
                  v-for="(data, index) in item.items"
                  :key="index"
                >
                  <div class="btn-item">
                    <v-btn color="success" @click="addItem(itemsRight[key])"
                      >Thêm
                    </v-btn>
                    <v-btn
                      color="error"
                      @click="removeItem(itemsRight[key], index)"
                      v-if="item.items.length > 1"
                      >Xóa
                    </v-btn>
                  </div>
                  <h3
                    contenteditable
                    class="headline"
                    style="font-weight: bold"
                    @blur="
                      onInput(
                        $event,
                        'itemsRight[' +
                          key +
                          '].items[' +
                          index +
                          '].timeperiod'
                      )
                    "
                  >
                    {{ data.timeperiod }} :
                  </h3>
                  <p
                    contenteditable
                    class="info"
                    @blur="
                      onInput(
                        $event,
                        'itemsRight[' +
                          key +
                          '].items[' +
                          index +
                          '].description'
                      )
                    "
                  >
                    {{ data.description }}
                  </p>
                </div>
              </draggable>
            </div>
          </div>
        </draggable>
      </div>
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
  .resume-title {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    padding: 10px 0;
    font-size: 24px;
    font-weight: bold;
  }

  position: relative;
  margin-left: 10px;
  background: #cccccc;

  .leftCol {
    width: 35%;
    float: left;
    padding: 0;
    text-align: left;
    color: #ffffff;
    color: rgba(255, 255, 255, 0.59);
    //background-color: #16151c;
    background-color: rgb(80, 92, 105);
    overflow: hidden;
    display: block;
    color: white;

    .section-headline {
      //color: rgba(255, 255, 255, 0.54);
      color: white;
    }

    a {
      // color: rgba(255, 255, 255, 0.59);
      color: white;
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

      .block {
        width: 400px;
        position: relative;

        .btn-item {
          position: absolute;
          /* right: 0px;
                         top: -18px;*/
          right: 50px;
          top: -4px;
          display: none;

          button {
            margin-right: 10px;
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
        padding-top: 10px;
      }
    }

    .block:hover {
      .btn-item {
        display: inline-block;
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
    margin-top: 0;
    margin: 0;
    padding: 0;
    line-height: 15pt;
    font-weight: 500;
    letter-spacing: 3px;
    color: #16151c;
    color: rgba(63, 61, 60, 0.71);
    display: block;
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
  font-size: 24px;
  opacity: 0.8;
  margin-left: 20px;
  margin-top: 12px;
  margin-bottom: 6px;
  color: #3f3d3c;
  //display: relative;
  width: 85%;
  border-bottom: 4px solid rgb(241, 185, 156);

  &.is-not-border {
    border-bottom: unset;
    padding: 5px 10px;
    background-color: rgb(80, 92, 105);
    color: white;
    margin-left: unset;
    width: 90%;
    border-right: 200px solid rgb(241, 185, 156);
  }
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
  font-weight: 500;
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

  .add-item {
    display: none;
  }

  .item-right:hover {
    .add-item {
      display: inline-block;
    }
  }

  .experience {
    margin-top: 47px;
  }

  .about {
    display: block;
    margin-top: 8px !important;
    font-weight: 400;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.541176);
    width: 90%;
  }

  .block {
    width: 90%;
    position: relative;
    background-color: #ffffff;
    padding: 20px;
    margin-top: 12px;
    margin-bottom: 12px;
    display: inline-block;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16),
      0 2px 10px 0 rgba(0, 0, 0, 0.12);

    .btn-item {
      position: absolute;
      top: -20px;
      right: -5px;
      display: none;

      button {
        margin-right: 10px;
      }
    }

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
      }
    }
  }

  .block:hover {
    .btn-item {
      display: inline-block;
    }
  }
}

#myselfpic {
  color: black;

  img {
    height: 100%;
    width: 100%;
  }
}

#myselfpic:hover {
  outline: 1pt dashed #77a5cc;
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

.item-left:hover,
.item-right:hover {
  outline: 1pt dashed #77a5cc;
}

.item-right {
  margin-right: 10px;
}

.resume-content {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
}

.skill-item {
  margin-left: 25px;
}

.skill-item:hover,
.hobby-item:hover {
  outline: 1pt dashed #77a5cc;
}

.is-modal-upload-img {
  margin-top: 15px;
}

/* .is-line {
         margin: 0 auto;
         width: 300px;
         height: 5px;
         background: rgb(241,185,156);
     }*/
</style>
