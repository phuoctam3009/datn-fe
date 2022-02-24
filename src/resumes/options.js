import yaml from 'js-yaml';
import {
    PERSON
} from '../../resume/data.yml';
import draggable from "vuedraggable";
import nestedDraggable from "./infra/nested";
import _ from 'lodash';
import PictureInput from 'vue-picture-input'
import { getResumeById } from '../api/resume/resume'
import jsPDF from 'jspdf'
import domtoimage from "dom-to-image";
function getVueOptions(nameTemplate) {
    const opt = {
        name: nameTemplate,
        components: {
            draggable,
            nestedDraggable,
            PictureInput
        },
        data() {
            return {
                title: yaml.load(PERSON).title,
                person: yaml.load(PERSON).person,
                avatar: require('../../resume/id.jpg'),
                avatarTemp: "",
                itemsRight: [
                    {
                        name: "Kinh nghiệm làm việc",
                        key: "Kinh nghiệm làm việc",
                        className: "experience",
                        items: yaml.load(PERSON).experience,
                        active: true
                    },
                    {
                        name: "Học vấn",
                        key: "Học vấn",
                        className: "education",
                        items: yaml.load(PERSON).education,
                        active: true
                    },
                    {
                        name: "Hoạt động",
                        key: "Hoạt động",
                        className: "activities",
                        items: yaml.load(PERSON).activites,
                        active: true
                    },
                    {
                        name: "Thành tích",
                        key: "Thành tích",
                        className: "awards",
                        items: yaml.load(PERSON).awards,
                        active: true
                    }
                ],
                itemsLeft: [
                    {
                        name: "Kỹ năng",
                        key: "Kỹ năng",
                        className: "skills",
                        items: yaml.load(PERSON).skills,
                        active: true
                    },
                    {
                        name: "Sở thích",
                        key: "Sở thích",
                        className: "hobbies",
                        items: yaml.load(PERSON).hobbies,
                        active: true
                    },
                ],
                saveResume: false,
                dialogAvatar: false,
                editable: true,

                // terms: terms,
            };
        },
        props: ['itemSelectedLeft', 'itemSelectedRight', 'statusSaveResume', 'query'],
        created() {
            if (this.query && this.query == 'edit') {
                this.editable = true;
            }
            if (this.$route.params.resumeId) {
                getResumeById(this.$route.params.resumeId).then(response => {
                    console.log('response', response);
                    if (response.status == 200) {
                        var dataTemp = JSON.parse(response.data.content);
                        this.title = response.data.title;
                        this.person = dataTemp.person;
                        this.itemsRight = dataTemp.itemsRight;
                        this.itemsLeft = dataTemp.itemsLeft;
                        this.avatar = response.data.avatar
                        // this.person
                    }
                })
            }
        },
        mounted() {
            this.avatarTemp = this.avatar;
        },
        computed: {
            lang() {
                const defaultLang = "en";
                // const useLang = this.terms[this.person.lang];

                // overwrite non-set fields with default lang
                // Object.keys(defaultLang)
                //     .filter(k => !useLang[k])
                //     .forEach(k => {
                //         console.log(k);
                //         useLang[k] = defaultLang[k];
                //     });

                return "en";
            },

            contactLinks() {
                const links = {};

                if (this.person.contact.github) {
                    links.github = `https://github.com/${this.person.contact.github}`;
                }

                if (this.person.contact.codefights) {
                    links.codefights = `https://codefights.com/profile/${this.person.contact.codefights}`;
                }

                if (this.person.contact.medium) {
                    links.medium = `https://medium.com/@${this.person.contact.medium}`;
                }

                if (this.person.contact.email) {
                    links.email = `mailto:${this.person.contact.email}`;
                }

                if (this.person.contact.linkedin) {
                    links.linkedin = `https://linkedin.com/in/${this.person.contact.linkedin}`;
                }

                if (this.person.contact.phone) {
                    links.phone = `tel:${this.person.contact.phone}`;
                }

                return links;
            },
        },
        methods: {
            onInput(event, key) {
                _.set(this._data, key, event.target.innerText);
            },
            addItem(itemCategory) {

                var temp = this.itemsRight.find(item => item.className == itemCategory.className).items;
                if (temp.length > 0) {
                    this.itemsRight.find(item => item.className == itemCategory.className).items.push({ ...temp[0] });
                }
            },
            removeItem(itemCategory, index) {
                var temp = this.itemsRight.find(item => item.className == itemCategory.className).items.filter((data, i) => i != index)
                if (temp.length >= 1) {
                    this.itemsRight.find(item => item.className == itemCategory.className).items = temp;
                }
            },
            addItemLeft(itemCategory) {

                var temp = this.itemsLeft.find(item => item.className == itemCategory.className).items;
                if (temp.length > 0) {
                    this.itemsLeft.find(item => item.className == itemCategory.className).items.push({ ...temp[0] });
                }
            },

            removeItemLeft(itemCategory, index) {
                var temp = this.itemsLeft.find(item => item.className == itemCategory.className).items.filter((data, i) => i != index)
                if (temp.length >= 1) {
                    this.itemsLeft.find(item => item.className == itemCategory.className).items = temp;
                }
            },
            openDialogAvatar() {
                this.dialogAvatar = true;
            },
            onChange(image) {
                if (image) {
                    this.avatarTemp = image
                } else {
                    console.log('FileReader API not supported: use the <form>, Luke!')
                }
            },
            saveImage() {
                this.avatar = this.avatarTemp;
                this.dialogAvatar = false;
            },
            cancelDialog() {
                this.dialogAvatar = false;
            },
            async downloadWithCSS() {
                /** WITH CSS */
                var blob = null;
                await domtoimage
                    .toPng(this.$refs.content)
                    .then(function (dataUrl) {
                        var img = new Image();
                        img.src = dataUrl;
                        const doc = new jsPDF({
                            orientation: "portrait",
                            // unit: "pt",
                            format: [900, 1400]
                            // format: "letter"
                        });
                        doc.addImage(img, "JPEG", 20, 20);
                        const date = new Date();
                        const filename =
                            "timechart_" +
                            date.getFullYear() +
                            ("0" + (date.getMonth() + 1)).slice(-2) +
                            ("0" + date.getDate()).slice(-2) +
                            ("0" + date.getHours()).slice(-2) +
                            ("0" + date.getMinutes()).slice(-2) +
                            ("0" + date.getSeconds()).slice(-2) +
                            ".pdf";
                        doc.save(filename);
                        blob = doc.output('datauristring');
                    })
                    .catch(function (error) {
                        console.error("oops, something went wrong!", error);
                        blob = "";
                    });
                return blob;
            },
        },
        watch: {
            itemSelectedLeft: {
                handler: function (val, oldVal) {
                    if (val.length == 0) {
                        this.itemsLeft.forEach(item => item.active = false);
                    }
                    else if (val.length == this.itemsLeft.length) {
                        this.itemsLeft.forEach(item => item.active = true);
                    } else {
                        for (var i = 0; i < this.itemsLeft.length; i++) {
                            if (val.includes(this.itemsLeft[i].key)) {
                                this.itemsLeft[i].active = true;
                            } else {
                                this.itemsLeft[i].active = false;
                            }
                        }
                    }
                },
                deep: true
            },
            itemSelectedRight: {
                handler: function (val, oldVal) {
                    if (val.length == 0) {
                        this.itemsRight.forEach(item => item.active = false);
                    }
                    else if (val.length == this.itemsRight.length) {
                        this.itemsRight.forEach(item => item.active = true);
                    } else {
                        for (var i = 0; i < this.itemsRight.length; i++) {
                            if (val.includes(this.itemsRight[i].key)) {
                                this.itemsRight[i].active = true;
                            } else {
                                this.itemsRight[i].active = false;
                            }
                        }
                    }
                },
                deep: true
            },
            statusSaveResume: {
                handler: function (val, oldVal) {
                    if (val == true) {
                        var blob;
                        this.downloadWithCSS().then(response => {
                            console.log(response);
                            blob = response
                        });
                        var data = {
                            person: this.person,
                            itemsLeft: this.itemsLeft,
                            itemsRight: this.itemsRight,
                            title: this.title,
                            image: this.avatar,
                            path: blob,
                        }
                        console.log('data1', data);
                        this.$emit("getInfoData", data);

                    }
                },
                deep: true
            }
        }

    };
    return opt;
}

export {
    getVueOptions,
    draggable,
    nestedDraggable
};
