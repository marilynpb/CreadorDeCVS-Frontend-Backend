const nodemailer = require("nodemailer")
require('dotenv').config()

const contactoForm = async(req, res)=>{
    const {
        nombre, email, asunto, mensaje
    } = req.body
    try{
        const transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: false,
            auth: {
            user: process.env.userMailer,
            pass: process.env.passMailer
            },
            tls:{
                rejectUnauthorized: false
            }
        });

        const info = await transport.sendMail({
            from: '"🔹 FreeCVMaker 🔹 - Formulario de Contacto"',
            to: "glumytheinmortales@gmail.com",
            subject: "Formulario de Contacto - FreeCVMaker",
            html:`
            <h4>Nueva consulta</h4>
            <ul>
                <li>Nombre: ${nombre}</li>
                <li>Email: ${email}</li>
                <li>Asunto: ${asunto}</li>
            </ul>
            <p>${mensaje}</p>`,
        });

        req.flash("mensajes", [{msg: "Se ha enviado correctamente"}])
        res.redirect('/pages/contacto')
    }
    catch(error){
        req.flash("mensajes", [{msg: "Error al enviar el formulario, intente nuevamente"}])
        res.redirect('/pages/contacto')
    }
}

module.exports = {
    contactoForm
}
