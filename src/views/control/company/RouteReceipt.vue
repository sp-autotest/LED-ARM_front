<template>
    <div class="route-receipt">
        <div
                v-for="(item, key) in photos"
                :key="key"
                class="route-receipt-content"
                @click="fileName = key"
        >
            <img
                    @click="getPhoto(item.url)"
                    width="100px"
                    v-if="item.url"
                    :src="item.url"
            >
            <p v-else class="green-text">Иллюстрация {{key + 1}}</p>
            <cFileLoad
                @selected="file = $event"
            ></cFileLoad>
            <cButton
                    @click.native="getPhoto(item.url)"
                    buttonValue="Посмотреть"
                    buttonColor="rgb(255, 169, 39)"
            ></cButton>
            <cButton
                    @click.native="deletePhoto(item.id)"
                    buttonValue="Удалить"
                    buttonColor="rgb(31, 32, 65)"
            ></cButton>
        </div>
    </div>
</template>

<script>
    import * as types from "@/stores/modules/controls/company/types";

    import cFileLoad from "@/components/base_components/cFileLoad";
    import cButton from "@/components/base_components/cButton";
    export default {
        name: "RouteReceipt",
        components:{
            cFileLoad,
            cButton
        },
        data() {
            return {
                photos: [],
                file: '',
                fileName: '',
                fileNameHelper: [],
            }
        },
        mounted() {
            this.$store.dispatch("company/" + types.A_GET_PHOTO, this.$route.params.id)
                .then( res => {
                    console.log(res);
                    this.photos = res.data.data.pictures
                    for (let i = 0; i < 4; i++){
                        if (this.photos.length < 4){
                            this.photos.push('')
                        }
                    }
                    console.log(this.photos);
                })
        },
        methods: {
            deletePhoto(id) {
                console.log(id);
                this.$store.dispatch("company/" + types.A_DELETE_PHOTO, {id})
                    .then( res => {
                        console.log(res);
                    })
            },
            getPhoto(url) {
                window.open(url, "_blank")
            }
        },
        watch: {
            file(file) {
                // window.URL.createObjectURL(newFile)
                let format = file.name.split(".")[1];
                let newName = this.fileNameHelper[this.fileNameHelper.length - 2] + "." + format;
                let blob = file.slice(0, file.size, file.type);
                let newFile = new File([blob], newName, {type: file.type});
                const fd = new FormData();
                fd.append('file', newFile, newFile.name);
                console.log(newFile);
                this.$store.dispatch("company/" + types.A_SAVE_PHOTO, {'file': fd, image_position: this.fileNameHelper[this.fileNameHelper.length - 2]})
                    .then( res => {
                        console.log(res);
                    })
            },
            fileName(name) {
                if (name == 0){
                    this.fileNameHelper.push('top')
                } else if (name == 1){
                    this.fileNameHelper.push('right')
                } else if (name == 2){
                    this.fileNameHelper.push('bottom')
                } else if (name == 3){
                    this.fileNameHelper.push('left')
                }
            }
        }
    }
</script>

<style  lang="scss" scoped>
    .route-receipt-content{
        width: 900px;
        display: grid;
        grid-template-columns: 1fr auto auto auto;
        grid-gap: 10px;
        padding: 20px 0 0 0;
    }
    .green-text{
        font-family: "Montserrat";
        font-weight: bold;
        font-size: 12px;
        line-height: normal;
        color: #5CDF81;
    }
</style>