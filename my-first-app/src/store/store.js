import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex); // tell Vue you want to use Vuex plugin

export const store = new Vuex.Store({ // we need to export it to make it avaibla for other components to use the store
  strict: true, // no permite que se hagan cambios de estado por fuera del store

  state:{
    options:[
      {name: 'uno', value: 1},
      {name: 'dos', value: 2},
      {name: 'tres', value: 3},
      {name: 'cuatro', value: 4},
    ],

//##########################################################################################
// Backend details
//##########################################################################################

    backendEndPoint: "http://192.168.99.100:8090",

//##########################################################################################
// Burguer menu model
//##########################################################################################

    sideNavStyle:{
      backgroundColor: '',
      width: ''
    },
    renderDashboardView : true,
    renderSecurityView : false,
    renderActionAddView : false,
    renderAboutView : false,
    renderTriggerAddView : false,
    renderDataStreamView : false,

//##########################################################################################
// Data Stream model
//##########################################################################################

    dataStreamsConfigured:[
      {id: 0, name: 'Solar light in garden'},
      {id: 1, name: 'Temperature inside the house'},
      {id: 2, name: 'Temperature outside the house'},
      {id: 3, name: 'Car Volumetric Sensor'},
      {id: 4, name: 'Pressure inside the house'},
      {id: 5, name: 'UV-Intensity'},
      {id: 6, name: 'Humidity inside guest-room'},
      {id: 7, name: 'Humidity outside the house'},
      {id: 8, name: 'Pressure outside the house'},
      {id: 9, name: 'Movement sensor in atic'}
    ],

    dataStreamNotUpdatedFor:{
      months:0,
      weeks:0,
      days:0,
      hours:0,
      minutes:0,
      seconds:0,
    },

    dataStreamToAdd:'',

    editDataStream: false,

    dataStreamFilter: undefined,
    pagesNeededForDataStreams: 0,
    maxDataStreamsPerPage: 5,
    dataStreamsForPage: [],
    filteredDataStreams: [],
    intermediateDataStreams:[],
    activeDataStream:[],
    dataStreams: [],
    dataStreamSelected: [],
    displayLoadingFeedbackDataStreams: false,




    elementsToDelete: [],



//##########################################################################################
// Pagination model
//##########################################################################################

    optionsOfEntriesPerPage:[
      {id:0, value:5},
      {id:1, value:10},
      {id:2, value:15},
      {id:3, value:20},
    ],
    currentPage: 1,
    pagesNeeded: undefined,
    elementsInCurrentPage: undefined,

//##########################################################################################
// Security model
//##########################################################################################

    securityKey : '91c-xdy-w5w',

  },

  getters:{

  },

  mutations: { // si uso mutaciones, el developer mediante las vue tools puede ser claramente el nombre de la mutación
    // que ocasionó el cambio de estado. Por lo tanto facilita el debugging.

    // no sirven para comunicarse contra backends, xq es una transaccion asíncrona. Toma tiempo que responda.
    // por ejemplo, si miro en vue tools, voy a ver que se ejecutó la mutación X, pero la vista no se va a actualizar
    // hasta tanto el backend haya respondido. Si tengo N mutaciones asincronas, es un lío poder detectar cual se ejcutó
    // y el resultado de la misma (la mutación no se lista cuando terminó sino cuando se lanzó).
    reduceOptions: state => {
      state.options.forEach( option => {
        option.value+=1;

      })
    },
//##########################################################################################
// Burguer menu mutations
//##########################################################################################

    openNav: state => {
      state.sideNavStyle.backgroundColor = "#111";
      state.sideNavStyle.width = "250px";
    },

    showDashboardView: state => {
      state.renderDashboardView = true;
      state.renderDataStreamView = false;
      state.renderActionAddView = false;
      state.renderTriggerAddView = false;
      state.renderSecurityView = false;
      state.renderAboutView = false;
    },

    closeNav: state => {
      state.sideNavStyle.backgroundColor = "white";
      state.sideNavStyle.width = "0";
    },

    showDataStreamView: state => {
      state.renderDashboardView = false;
      state.renderDataStreamView = true;
      state.renderActionAddView = false;
      state.renderTriggerAddView = false;
      state.renderSecurityView = false;
      state.renderAboutView = false;

      // Initially you should assume showing all data streams with no fitering
      state.filteredDataStreams = state.dataStreamsConfigured;

      //getPagesNeeded(state.filteredDataStreams, state.maxDataStreamsPerPage);
    },

    showActionView: state => {
      state.renderDashboardView = false;
      state.renderDataStreamView = false;
      state.reerAndctionAddView = true;
      state.renderTriggerAddView = false;
      state.renderSecurityView = false;
      state.renderAboutView = false;
    },

    showTriggerView: state => {
      state.renderDashboardView = false;
      state.renderDataStreamView = false;
      state.renderActionAddView = false;
      state.renderTriggerAddView = true;
      state.renderSecurityView = false;
      state.renderAboutView = false;
    },

    showSecurityView: state => {
      state.renderDashboardView = false;
      state.renderDataStreamView = false;
      state.renderActionAddView = false;
      state.renderTriggerAddView = false;
      state.renderSecurityView = true;
      state.renderAboutView = false;
    },

    showAboutView: state => {
      state.renderDashboardView = false;
      state.renderDataStreamView = false;
      state.renderActionAddView = false;
      state.renderTriggerAddView = false;
      state.renderSecurityView = false;
      state.renderAboutView = true;
    },

//##########################################################################################
// Pagination mutations
//##########################################################################################

    getPagesNeeded: (state, allExistingElements, maxPerPage) => {
      console.log(" Existing elements length: " + allExistingElements.length);
      console.log(" MaxPerPage: " + maxPerPage);
      let pagesNeeded = allExistingElements.length / maxPerPage;
      console.log(" pagesNeeded " + pagesNeeded);

      // if number is int, that's it
      if(pagesNeeded % 1 === 0){
        state.pagesNeeded = pagesNeeded;
      }
      else{
        // if not, we need the next since at least one element will be shown on the 'n' page
        state.pagesNeeded = Math.ceil(pagesNeeded);
      }
    },

    getPagesNeededFirstTimeForDataStream: state => {
      let allExistingElements = state.filteredDataStreams;
      let maxPerPage = state.maxDataStreamsPerPage;

      console.log(" Existing elements length: " + allExistingElements.length);
      console.log(" MaxPerPage: " + maxPerPage);

      let pagesNeeded = allExistingElements.length / maxPerPage;

      console.log(" pagesNeeded " + pagesNeeded);

      // if number is int, that's it
      if(pagesNeeded % 1 === 0){
        state.pagesNeededForDataStreams= pagesNeeded;
      }
      else{
        // if not, we need the next since at least one element will be shown on the 'n' page
        state.pagesNeededForDataStreams = Math.ceil(pagesNeeded);
      }
    },

    getElementsToShowInTable: (state, pageNumber, maxPerPage, elementsInCurrentPage, allElements)=> {
      console.log(" Entering getElementsToShowInTable");

      state.currentPage = pageNumber;
      console.log("currentPage: "  + state.currentPage);

      elementsInCurrentPage=[];

      for (i=(state.currentPage-1)*maxPerPage; i<state.currentPage*maxPerPage; i++){

        if(allElements[i] !== undefined){
          elementsInCurrentPage.push(allElements[i]);
          console.log("elementsInCurrentPage length " + elementsInCurrentPage.length);
        }
      }
            state.elementsInCurrentPage = elementsInCurrentPage;

    },


    getElementsToShowInTableFirstTimeForDataStream: state => {
      console.log(" Entering getElementsToShowInTable");
      let pageNumber= 1;
      let maxPerPage = state.maxDataStreamsPerPage;
      let elementsInCurrentPage = [];
      let allElements;
      allElements = state.filteredDataStreams;

      state.currentPage = pageNumber;
      console.log("currentPage: "  + state.currentPage);

      //elementsInCurrentPage=[];

      for (let i=(state.currentPage-1)*maxPerPage; i<state.currentPage*maxPerPage; i++){

        if(allElements[i] !== undefined){
          elementsInCurrentPage.push(allElements[i]);
          console.log("elementsInCurrentPage length " + elementsInCurrentPage.length);
        }
      }
      state.dataStreamsForPage = elementsInCurrentPage;

    },

    displayPrevPage: (state, maxPerPage, elementsInCurrentPage, allElements) => {
      console.log(" Entering displayPrevPage");
      state.currentPage -= 1;

      return state.commit('getElementsToShowInTable', state.currentPage, maxPerPage, elementsInCurrentPage, allElements);
    },

    displayNextPage: (state, maxPerPage, elementsInCurrentPage, allElements) => {
      console.log(" Entering displayNextPage");
      state.currentPage += 1;

      return state.commit('getElementsToShowInTable', state.currentPage, maxPerPage, elementsInCurrentPage, allElements);
    },

//##########################################################################################
// Datas Stream mutations
//##########################################################################################

    addElementToDeleteList: (state, elem) => {
      console.log(" Entering addElementToDeleteList!");

      console.log("elementsToDelete: " + state.elementsToDelete);
      console.log("elem: " + elem);

      //if already exists, delete it; add it otherwise
      if (this.elementsToDelete.indexOf(elem.name) > -1) {
        this.elementsToDelete.splice(state.elementsToDelete.indexOf(elem.name), 1);
      } else {
        this.elementsToDelete.push(elem.name);
      }
      console.log("elementsToDelete: " + state.elementsToDelete);
      console.log("elem: " + elem);
    },

    showDataStream: (state, dataStream) => {
      state.editDataStream = false;
      state.activeDataStream = dataStream;
    },

    editDataStreams: (state, dataStream) => {
      console.log(" Entering editDataStream");
      console.log(" activeDataStream: " + state.activeDataStream);
      state.activeDataStream = dataStream;
      state.editDataStream = true;
      console.log("activeDataStream: " + state.activeDataStream);

    },

    updateDataStreamsForPage: (state, value) => {
      console.log(" Entering updateDataStreamsForPage");
      state.dataStreamsForPage = value;
    },

    assignPagesNeededForDataStreams: state => {
      state.pagesNeededForDataStreams = state.pagesNeeded;
    }


  },

  actions:{ // es una BUENA PRACTICA que todas sean acciones y commiteen mutaciones, aún éstas no sean asíncronas

    reduceOptions: context => { //el contexto actua "como" la store
      setTimeout(function () {
        context.commit('reduceOptions');
      }, 3000)
    },

    openNav: context =>{
      context.commit('openNav');
    },

    showDashboardView: context => {
      console.log("Entering showDashboardView");
      context.commit('showDashboardView');
    },

    closeNav: context => {
      context.commit('closeNav');
    },

    showDataStreamView: context => {

      console.log("Entering showDataStreamView ");

      context.commit('showDataStreamView');
      context.commit('getPagesNeededFirstTimeForDataStream');
      context.commit('getElementsToShowInTableFirstTimeForDataStream');
    },

    showActionView: context =>{
      console.log("Entering showActionView ");

      // initially you should assume showing all trigger with no fitering
      //this.filteredActions = this.existingActions;

      //this.pagesNeededForActions = this.getPagesNeeded(this.filteredActions, this.maxActionsPerPage);

      //console.log(" pagesNeededForActions " + this.pagesNeededForActions);

      //this.getElementsToShowInTable(1);
      //this.actionsForPage = this.getElementsToShowInTable(1, this.maxActionsPerPage, this.actionsForPage, this.filteredActions);

      context.commit('showActionView');
    },

    showTriggerView: context =>{
      console.log("Entering showTriggerView ");
      //this.renderOneTimeTrigger = false;

      // initially you should assume showing all trigger with no fitering
      // this.filteredTriggers = this.existingTriggers;

      //this.pagesNeededForTriggers = this.getPagesNeeded(this.filteredTriggers, this.maxTriggersPerPage);

      //console.log(" pagesNeededForTriggers " + this.pagesNeededForTriggers);

      //this.getElementsToShowInTable(1);
      //this.triggersForPage = this.getElementsToShowInTable(1, this.maxTriggersPerPage, this.triggersForPage, this.filteredTriggers);

      context.commit('showTriggerView');
    },

    showSecurityView: context =>{
      console.log("Entering showSecurityView ");
      context.commit('showSecurityView');
    },

    showAboutView: context =>{
      console.log("Entering showAboutView ");
      context.commit('showAboutView');
    },

    getPagesNeeded: (context, allExistingElements, maxPerPage) => {
      console.log("Entering getPagesNeeded ");
      context.commit('getPagesNeeded', allExistingElements, maxPerPage);
    },

    getElementsToShowInTable: (context, pageNumber, maxPerPage, elementsInCurrentPage, allElements) => {
      console.log("Entering getElementsToShowInTable ");
      context.commit('getElementsToShowInTable', pageNumber, maxPerPage, elementsInCurrentPage, allElements);
    },

    displayPrevPage: (context, maxPerPage, elementsInCurrentPage, allElements) => {
      console.log("Entering displayPrevPage ");
      context.commit('displayPrevPage', maxPerPage, elementsInCurrentPage, allElements);
    },

    displayNextPage: (context, maxPerPage, elementsInCurrentPage, allElements) => {
      console.log("Entering displayNextPage ");
      context.commit('displayNextPage', maxPerPage, elementsInCurrentPage, allElements);
    },

    addElementToDeleteList: (context, elem) => {
      console.log("Entering addElementToDeleteList ");
      context.commit('addElementToDeleteList', elem);
    },

    showDataStream: (context, dataStream) => {
      console.log("Entering showDataStream ");
      context.commit('showDataStream', dataStream);
    },

    editDataStreams: (context, dataStream) => {
      console.log("Entering editDataStreams ");
      context.commit('editDataStreams', dataStream);
    },

    updateDataStreamsForPage: (context, value) =>{
      console.log("Entering updateDataStreamsForPage");
      context.commit('updateDataStreamsForPage', value);
    }

  }
})

