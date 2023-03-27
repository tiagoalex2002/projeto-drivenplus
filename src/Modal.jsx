import styled from "styled-components"
import React from "react"
import { useNavigate } from "react-router-dom"
import { useContext } from "react";
import axios from "axios";
import SigningContext from "./Context/SigningContext";
function Modal({onClose}){

    const usuarioDes= localStorage.getItem("usuario")
    const informacoes=JSON.parse(usuarioDes)

    const navigate=useNavigate();

    const {cardname, setCardname, digits, setDigits, cvv, setCvv, expire, setExpire, pacote, setPacote, open, setOpen}= useContext(SigningContext)

    function Assinar(){
        const body= {membershipId:pacote.id, cardName: cardname, cardNumber: digits, securityNumber: cvv, expirationDate: expire}
        const promise=axios.post(`https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions`,body,{
               headers: { Authorization: `Bearer ${informacoes.token}` }
             });
            promise.then((response)=>{const signatures=JSON.stringify(response.data);
             localStorage.setItem("assinatura",signatures);
             navigate("/home");
             setOpen(false) })
            promise.catch((error)=> alert(error.response.data.message))
        
        
    }
    if(!open){
        return null
    }
    else{
        return(
            <Overlay>
                <Alert>
                    <Texto>Tem certeza que deseja assinar o plano {pacote.name} por R${pacote.price}?</Texto>
                    <Container>
                        <No onClick={onClose}>Não</No>
                        <Yes onClick={Assinar}>Sim</Yes>
                    </Container>
                </Alert>
            </Overlay>
        )
    }
}

export default Modal;


const No= styled.button `
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
gap: 10px;
width: 95px;
height: 52px;
background: #CECECE;
border-radius: 8px;
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
color: #FFFFFF;`;

const Yes=styled.button `
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
gap: 10px;
width: 95px;
height: 52px;
background: #FF4791;
border-radius: 8px;
margin-left:14px;
font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 16px;

color: #FFFFFF;`;

const Alert=styled.div `
width: 248px;
height: 210px;
background: #FFFFFF;
border-radius: 12px;
font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 21px;
text-align: center;

color: #000000;
display:flex;
flex-direction:column;
justify-content:center;
align-items: center;

`;

const Container= styled.div `
display:flex;
flex-direction:row;
margin-top:47px`;

const Overlay=styled.div ` 
background-color: rgba(0, 0, 0, 0.5); 
position: fixed;
width: 100%;
height: 100%;
top:0;
left:0;
bottom:0;
rigth:0;
zIndex:4;
display:flex;
align-items:center;
justify-content:center;`

const Texto=styled.div `
font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 21px;
text-align: center;

color: #000000;
height: 67px;
width: 204px;
`
  