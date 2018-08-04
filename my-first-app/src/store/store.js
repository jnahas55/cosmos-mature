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
    },

    showActionView: state => {
      state.renderDashboardView = false;
      state.renderDataStreamView = false;
      state.renderActionAddView = true;
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

      // initially you should assume showing all data streams with no fitering
      //this.filteredDataStreams = this.dataStreamsConfigured;

      //this.pagesNeededForDataStreams = this.getPagesNeeded(this.filteredDataStreams, this.maxDataStreamsPerPage);

      //console.log(" pagesNeededForDataStreams " + this.pagesNeededForDataStreams);

      //this.dataStreamsForPage = this.getElementsToShowInTable(1, this.maxDataStreamsPerPage, this.dataStreamsForPage, this.filteredDataStreams);

      context.commit('showDataStreamView');

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
    }
  }
})

