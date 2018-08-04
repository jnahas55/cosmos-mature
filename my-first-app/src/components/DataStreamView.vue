<template>
  <!-- div for showing the Data Stream add view -->
  <div v-if="renderDataStreamView">

    <i v-if="displayLoadingFeedbackDataStreams" class="fa fa-spinner fa-spin" style="font-size: 5rem; padding-left: 50%; padding-right: 50%;"></i>
    <!--div class="container"-->
    <div class="row">
      <br>

      <div class="col-md-1">
      </div>

      <div class="col-md-10">

        <h4 class="mb-3"><small><strong>Existing data streams</strong></small></h4>
        <hr>

        <div class="row">

          <div class="col-md-3">
            <div class="form-group form-inline well">
              <label for="entriesForPage" class="mr-sm-2 text-muted">Entries for page: </label>
              <select class="custom-select mb-2 mr-sm-2 mb-sm-0" id="httpMethod" v-model="maxDataStreamsPerPage">
                <option v-for="(elem, index) in optionsOfEntriesPerPage" v-bind:value="elem.value">
                  {{elem.value}}
                </option>
              </select>
            </div>
          </div>

          <div class="col-md-5">
            <div class="mb-3">
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"><i class="fa fa-search"></i></span>
                </div>

                <input type="text" class="form-control" v-model="dataStreamFilter" placeholder="Start typing to filter data streams..." required="true">

              </div>
            </div>
          </div>

          <div class="col-md-2">
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addDataStreamModal" style="width: 100%;"><strong>Add stream</strong></button>
          </div>

          <div class="col-md-2">
            <button v-if="elementsToDelete.length<1" type="button" disabled class="btn btn-danger" data-toggle="modal" data-target="#removeElements" style="width: 100%;"><strong>Delete</strong></button>
            <button v-else type="button" class="btn btn-danger" data-toggle="modal" data-target="#removeElements" style="width: 100%;"><strong>Delete</strong></button>

          </div>
        </div>

        <table class="table table-striped table-responsive table-sm" style="width: 100%">
          <thead class="thead-dark">
          <tr>
            <th scope="col" style="width: 2%"></th>
            <th scope="col" style="width: 92%">Name</th>
            <th scope="col" style="width: 3%"></th>
            <th scope="col" style="width: 3%"></th>
            <!--th scope="col" style="width: 2%"></th-->
          </tr>
          </thead>
          <tbody>
          <!--tr v-for="t in triggersForPage" v-bind:trigger="t" is="trigger-table-row"></tr-->
          <!--Refenrenced in ..... https://github.com/vuejs/Discussion/issues/204 -->

          <tr v-for="(dataStream, index) in dataStreamsForPage">
            <td>
              <div class="custom-control custom-checkbox" >
                <input type="checkbox" :id="dataStream.name" class="custom-control-input" @click="addElementToDeleteList(dataStream)">
                <label :for="dataStream.name" class="custom-control-label"></label>
              </div>
            </td>
            <td>{{dataStream.name}}</td>
            <td>
              <button type="button" class="btn btn-success btn-sm" @click="showDataStream(dataStream)" data-toggle="modal" data-target="#editDataStreamModal" style="height: 75%;">
                <i class="fa fa-eye"></i>
              </button>
            </td>
            <td>
              <button type="button" class="btn btn-info btn-sm" @click="editDataStreams(dataStream)" data-toggle="modal" data-target="#editDataStreamModal" style="height: 75%;">
                <i class="fa fa-pencil-square-o"></i>
              </button>
            </td>
          </tr>
          </tbody>
        </table>

        <div class="row">
          <br>
          <p></p>
          <br>
          <div class="col-md-4 text-muted">
            <p>Showing <strong>{{dataStreamsForPage.length}}</strong> out of <strong>{{dataStreamsConfigured.length}}</strong> entries</p>
          </div>
          <div class="col-md-8">
            <!--     Table pagination     -->
            <nav aria-label="Page navigation data streams">
              <ul class="pagination justify-content-end">
                <li v-bind:class="[currentPage > 1 ? 'page-item': 'page-item disabled']">
                  <a v-on:click="dataStreamsForPage = displayPrevPage(maxDataStreamsPerPage, dataStreamsForPage, filteredDataStreams)" class="page-link" href="#" tabindex="-1">Previous</a>
                </li>
                <li v-for="number in pagesNeededForDataStreams" v-bind:class="[currentPage == number ? 'page-item active': 'page-item']" v-on:click="dataStreamsForPage = getElementsToShowInTable(number, maxDataStreamsPerPage, dataStreamsForPage, filteredDataStreams)"><a class="page-link" href="#">{{number}}</a></li>
                <li v-bind:class="[currentPage<pagesNeededForDataStreams ? 'page-item': 'page-item disabled']">
                  <a v-on:click="dataStreamsForPage = displayNextPage(maxDataStreamsPerPage, dataStreamsForPage, filteredDataStreams)" class="page-link" href="#">Next</a>
                </li>
              </ul>
            </nav>
          </div>

        </div>


      </div>

      <div class="col-md-1">
      </div>
    </div>
    <!--/div-->
  </div>

</template>


<script>



</script>


<style scoped>


</style>
