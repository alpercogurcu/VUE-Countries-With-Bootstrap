<template>
  <div id="app">
    <div>
      <b-form-input
        type="text"
        placeholder="Tüm değerlerde ara"
        v-model="filters.all"
      ></b-form-input>
      <div class="TableClass">
        <b-table
          striped
          hover
          :items="filteredItems"
          :fields="headers"
          :busy="loading"
        >
          <template #table-busy>
            <div class="text-center text-danger my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Yükleniyor...</strong>
            </div>
          </template>

          <template slot="top-row" slot-scope="{ fields }">
            <td v-for="field in fields" :key="field.key">
              <div v-if="filterRow.indexOf(field.key) >= 0">
                <b-form-input
                  type="text"
                  :placeholder="field.label"
                  v-model="filters[field.key]"
                ></b-form-input>
              </div>
            </td>
          </template>

          <template #cell(flag)="flag">
            <!-- `data.value` is the value after formatted by the Formatter -->
            <img :src="flag.value" width="70" />
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
//
export default {
  name: "App",
  components: {},
  data: () => ({
    // filteredItems: "",
    headers: ["name", "capital", "region", "flag"],
    items: "",
    loading: true,
    filterRow: ["capital"],
    filters: {
      all: "",
      name: "",
      capital: "",
      region: "",
      flag: "",
    },

    emptyItem: [{}],
  }),
  created() {
    this.getCountries();
  },
  methods: {
    CreateEmptyItem() {
      for (let i = 0; i < this.headers.length; i++) {
        this.emptyItem[this.headers[i]] = "";
      }
    },
    getCountries() {
      this.$axios.get("/all").then((res) => {
        this.items = res.data;
        //  this.filteredItems = res.data;
        this.loading = false;
      });
    },
  },

  computed: {
    filteredItems() {
      if (this.loading) return this.emptyItem;

      let filterByColumn = true;
      let filtered = [{}];

      if (this.filters.all != "") filterByColumn = false;

      function getObjectValuesWithFilter(item, filterCriteria) {
        let trueCount = 0;
        Object.values(item).some((key) => {
          if (typeof key != "object") {
            if (String(key).toLowerCase().includes(filterCriteria)) trueCount++;
          } else {
            trueCount += getObjectValuesWithFilter(key, filterCriteria);
          }
        });
        return trueCount;
      }

      if (filterByColumn) {
        filtered = this.items.filter((item) => {
          return Object.keys(this.filters).every((key) =>
            String(item[key])
              .toLowerCase()
              .includes(this.filters[key].toLowerCase())
          );
        });
      } else {
        filtered = [{}];

        filtered = this.items.filter((item) => {
          return Object.values(item).some((key) => {
            let trueCount = 0;
            trueCount += getObjectValuesWithFilter(
              key,
              this.filters.all.toLowerCase()
            );
  
            return trueCount > 0 ? true : false;
          });
        });
      }

      return filtered.length > 0 ? filtered : this.emptyItem;
    },
  },
};
</script>

<style scoped>
.TableClass {
  margin: calc(2vw);
}
</style>
