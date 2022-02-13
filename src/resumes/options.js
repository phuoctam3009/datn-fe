import yaml from 'js-yaml';
import {
    PERSON
} from '../../resume/data.yml';
import draggable from "vuedraggable";
import nestedDraggable from "./infra/nested";
import _ from 'lodash';



// import {
//     terms
// } from '../terms';

// Called by templates to decrease redundancy
function getVueOptions(nameTemplate) {
    const opt = {
        name: nameTemplate,
        components: {
            draggable,
            nestedDraggable
        },
        data() {
            return {
                person: yaml.load(PERSON),
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
                ]

                // terms: terms,
            };
        },
        props: ['itemSelectedLeft', 'itemSelectedRight'],
        mounted() {
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
            }
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
