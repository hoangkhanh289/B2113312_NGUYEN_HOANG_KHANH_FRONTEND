<!-- src/views/ContactBook.vue -->
<template>
    <div class="page row">
        <div class="col-md-10">
            <InputSearch v-model="searchText" />
        </div>

        <div class="mt-3 col-md-6">
            <h4>
                Danh bạ
                <i class="fas fa-address-book"></i>
            </h4>

            <ContactList
                v-if="filteredContactsCount > 0"
                :contacts="filteredContacts"
                v-model:activeIndex="activeIndex"
            />
            <p v-else>Không có liên hệ nào.</p>

            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary" @click="refreshList">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                
                <button class="btn btn-sm btn-success" @click="goToAddContact">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>

                <button class="btn btn-sm btn-danger" @click="removeAllContacts">
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>
        </div>

        <div class="mt-3 col-md-6" v-if="activeContact">
            <h4>
                Chi tiết Liên hệ
                <i class="fas fa-address-card"></i>
            </h4>
            <ContactCard :contact="activeContact" />
        </div>
    </div>
</template>

<script>
import ContactCard from "@/components/ContactCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import ContactList from "@/components/ContactList.vue";
import ContactService from "@/services/contact.service";

export default {
    components: {
        ContactCard,
        InputSearch,
        ContactList,
    },
    data() {
        return {
            contacts: [],      // Danh sách liên hệ
            activeIndex: -1,   // Chỉ mục liên hệ được chọn
            searchText: "",    // Nội dung thanh tìm kiếm
        };
    },
    watch: {
        // Khi `searchText` thay đổi, bỏ chọn liên hệ đang chọn
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        // Chuyển contact thành chuỗi để tìm kiếm dễ dàng
        contactStrings() {
            return this.contacts.map(({ name, email, address, phone }) =>
                [name, email, address, phone].join("")
            );
        },
        // Danh sách contact đã lọc theo `searchText`
        filteredContacts() {
            if (!this.searchText) return this.contacts;
            return this.contacts.filter((_contact, index) =>
                this.contactStrings[index].includes(this.searchText)
            );
        },
        // Contact đang được chọn
        activeContact() {
            if (this.activeIndex < 0) return null;
            return this.filteredContacts[this.activeIndex];
        },
        // Số lượng contact hiển thị
        filteredContactsCount() {
            return this.filteredContacts.length;
        },
    },
    methods: {
        // Lấy danh sách liên hệ từ server
        async retrieveContacts() {
            try {
                this.contacts = await ContactService.getAll();
            } catch (error) {
                console.error("Lỗi khi lấy danh bạ:", error);
            }
        },
        // Làm mới danh sách
        refreshList() {
            this.retrieveContacts();
            this.activeIndex = -1;
        },
        // Xóa tất cả liên hệ
        async removeAllContacts() {
            if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
                try {
                    await ContactService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.error("Lỗi khi xóa danh bạ:", error);
                }
            }
        },
        // Điều hướng đến trang thêm liên hệ
        goToAddContact() {
            this.$router.push({ name: "contact.add" });
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>

<style scoped>
.page {
    text-align: left;
    max-width: 750px;
}
</style>
