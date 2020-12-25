import Vue from 'vue'
import Vuex from 'vuex'
import { auth, db, storage } from '@/firebase'
import router from '@/router'

import Swal from 'sweetalert2'
import moment from "moment";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario: '',
    usuarios: [],
    herramientas: [],
    pretamos: []
  },
  mutations: {
    /*----herramienta---*/
    nuevaHerramienta(state, payload) {
      state.herramientas = payload
    },
    eliminarHerramienta(state, id) {
      state.herramientas = state.herramientas.filter(doc => {
        return doc.id != id
      })
    },
    /*----fin de herramienta---*/
    /*----Prestamos---*/
    nuevoPrestamo(state, payload) {
      state.pretamos = payload
    },
    actualizarPrestamo(state, id) {
      state.pretamos = state.pretamos.filter(doc => {
        return doc.id != id
      })
    },
    /*----Fin Prestamos---*/
    listaUsuarios(state, payload) {
      state.usuarios = payload
    },
    nuevoUsuario(state, payload) {
      if (payload === null) {
        state.usuario = ''
      } else {
        state.usuario = payload
      }
    }
  },
  actions: {
    /*-------Gestion herramientas -------*/
    async agregarHerramienta({ commit }, herramienta) {
      try {
        const refImagen = storage.ref().child(herramienta.file.name);
        await refImagen.put(herramienta.file);
        const urlDescarga = await refImagen.getDownloadURL();

        herramienta.imagen = urlDescarga
        herramienta.fecha = new Date()
        const her = await db.collection('herramientas').doc().set({
          nombre: herramienta.nombre,
          cantidad: herramienta.cantidad,
          fecha: herramienta.fecha,
          imagen: herramienta.imagen,
          imagenName: herramienta.file.name,
        }

        )
        commit('nuevaHerramienta', herramienta)
        router.push('/')
      } catch (error) {
        console.log(error)
      }
    },
    async leerHerramienta({ commit }) {
      try {
        const dat = [];
        const datos = await db.collection("herramientas").orderBy("fecha", "desc")
        const allComtactos = await datos.get();

        for (const doc of allComtactos.docs) {
          let herramienta = doc.data()
          herramienta.id = doc.id
          dat.push(herramienta);
        }
        commit('nuevaHerramienta', dat)
      } catch (error) {
        console.log(error)
      }
    },
    async eliminarHerramienta({ commit }, herramienta) {

      const result = await Swal.fire({
        title: '¿ Esta Seguro ?',
        text: 'Esto se borrara para toda la vida',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, borrar esto',
        cancelButtonText: 'No'
      })

      if (result.value) {
        await db.collection('herramientas').doc(herramienta.id).delete()
        await storage.ref().child(herramienta.imagenName).delete()
        commit('eliminarHerramienta', herramienta.id)
      }
    },
    async quitarHerramienta({ commit }, herramienta) {

      if (herramienta.cantidad > 0) {
        herramienta.cantidad = herramienta.cantidad - 1
        await db.collection('herramientas').doc(herramienta.id).update(herramienta)
      }
    },
    async devolverHerramienta({ dispatch, state }, id) {
      await dispatch("leerHerramienta")//esto es para poder leer las herramientasentes de filtrarlas

      const key = state.herramientas = state.herramientas.find(doc => {
        return doc.id == id
      })

      if (key.cantidad >= 0) {
        key.cantidad = key.cantidad + 1
        await db.collection('herramientas').doc(key.id).update(key)
      }
    },
    /*-------fin gestion herramienta -------*/
    /*-------Gestion Prestamos -------*/
    async agregarPrestamo({ state }, herramienta) {

      const presta = {
        nombre: herramienta.nombre,
        fecha: Date.now(),
        idh: herramienta.id,
        imagen: herramienta.imagen,
        uid: state.usuario.uid
      }
      await db.collection('prestamos').doc().set(presta)

    },
    async leerPrestamo({ commit }) {
      try {
        moment.locale('es');
        const dat = [];
        const datos = await db.collection("prestamos").orderBy("fecha", "desc").get()

        for (const doc of datos.docs) {
          let prestamo = doc.data()
          prestamo.id = doc.id
          prestamo.fecha=moment(prestamo.fecha).fromNow()
          dat.push(prestamo);
        }
        commit('nuevoPrestamo', dat)
      } catch (error) {
        console.log(error)
      }
    },
    async devolverPrestamo({ dispatch, commit }, prestamo) {
      const result = await Swal.fire({
        title: '¿ Esta Seguro ?',
        text: 'Que quiere devolver ' + prestamo.nombre,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
      })

      if (result.value) {
        await dispatch("devolverHerramienta", prestamo.idh)
        await db.collection('prestamos').doc(prestamo.id).delete()
        commit('actualizarPrestamo', prestamo.id)
      }
    },

    /*-------FIN Gestion Prestamos -------*/
    async setUsuario({ commit }, user) {
      try {
        const doc = await db.collection('usuarios').doc(user.uid).get()
        if (doc.exists) {
          commit('nuevoUsuario', doc.data())
        } else {
          const usuario = {
            nombre: user.displayName,
            email: user.email,
            uid: user.uid,
            foto: user.photoURL,
            admin: 0
          }
          await db.collection('usuarios').doc(usuario.uid).set(
            usuario
          )
          commit('nuevoUsuario', usuario)
        }

      } catch (error) {
        console.log(error);
      }


    },
    async leerUsuario({ commit }) {
      try {
        const dat = [];
        const datos = await db.collection("usuarios").get();
        for (const doc of datos.docs) {
          let usuario = doc.data()
          usuario.id = doc.id
          dat.push(usuario);
        }
        commit('listaUsuarios', dat)
      } catch (error) {
        console.log(error)
      }
    },
    async cerrarSesion({ commit }) {

      const result = await Swal.fire({
        title: '¿ Esta Seguro que quiere salir?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
      })

      if (result.value) {
        auth.signOut()
        commit('nuevoUsuario', null)
        router.push("/login")
      }
    }
  },
  modules: {
  }
})
