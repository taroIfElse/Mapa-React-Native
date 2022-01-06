import React,{useState,useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View, Button } from 'react-native';
import {Map, Modal1, Panel, Input, List} from './components/Index'



export default function App() {
  const [puntos, setPuntos] = useState([]);
  const [nombre,setNombre] = useState({});
  const [puntoTemp,setPuntoTemp] = useState('');
  const [visibility,setVisibility] = useState(false);
  const [visibilityFilter, setVisibilityFilter] = useState('new_punto'); //new punto o all puntos
  const [pointFilters, setPointFilters] = useState(true);



  const handleLongPress = ({nativeEvent}) =>{
    setVisibilityFilter('new_punto')
    setPuntoTemp(nativeEvent.coordinate)
    setVisibility(true)
  }
 const handleChangeText = (text) =>{
 setNombre(text);
 }
const handleSubmit = () =>{
  const newPunto = { coordinate: puntoTemp, name: nombre }
  setPuntos(puntos.concat(newPunto))
  setVisibility(false);
  setNombre('')
}
const handleLista = () =>{
  setVisibilityFilter('all_puntos')
  setVisibility(true)
}
const handlePointFilters = () =>{setPointFilters(!pointFilters)}
  return (
    <View style={styles.container}>
      <Map onLongPress={handleLongPress} puntos={puntos} pointFilters={pointFilters} />
      <Panel onPressLeft={handleLista}textLeft='Lista' handlePointFilter={handlePointFilters}/>
      <Modal1 visibility={visibility}>
      {visibilityFilter == 'new_punto' ?
      <View style={styles.form}>  
      <Input title='Nombre :' placeholder='Ingrese el nombre del punto' onChangeText={handleChangeText}/>
      <Button title='Aceptar' onPress={handleSubmit} />
      </View>
      : <List puntos={puntos} closeModal={()=>{setVisibility(false)}}/>
    }    
      </Modal1>
    </View>
  );
}

const styles = StyleSheet.create({
 form:{padding:20},
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
