const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json())

let person = {
    name: "Ramazan",
    title: "Developer",
    phone: "444444444",
    mail: "sadadads@gmail.com",
    address: "ist/k.ç",
    dateOfBirth: new Date("1998.08.15"),
    avatar: "/client/logo.jpg",
    aboutMe: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi deleniti nisi sunt reprehenderit tate ipsam odit repel veritatis necessitatibus sint deleniti saepe minus?`
}

let skills = [
    {
        id:0,
        title: "C#",
        rate: 80
    },
    {
        id:1,
        title: "HTML",
        rate: 50
    },
    {
        id:2,
        title: "HTML",
        rate: 50
    }
]

let socialMedias = [
    {
        id:0,
        title: "linkedin",
        link: "https://tr.linkedin.com/",
        icon: "fa fa-linkedin"
    },
    {
        id:1,
        title: "Youtube",
        link: "https://youtube.com/",
        icon: "fa fa-youtube"
    }
]

let workExpiriences = [
    {
        id:0,
        title: "Web Developer",
        company: "Samsung",
        date: "2021",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugaquo tenetur. Ab, quibusdam iste obcaecati iusto temporibus atque nam quae qui quaerat sedveniam distinctio aut quidem pariatur ipsa at! lorem Lorem ipsum dolor sit amet consectetur"
    },
    {
        id:1,
        title: "Web Developer",
        company: "Samsung",
        date: "2021",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugaquo tenetur. Ab, quibusdam iste obcaecati iusto temporibus atque nam quae qui quaerat sedveniam distinctio aut quidem pariatur ipsa at! lorem Lorem ipsum dolor sit amet consectetur"
    }, {
        id:2,
        title: "Web Developer",
        company: "Samsung",
        date: "2021",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugaquo tenetur. Ab, quibusdam iste obcaecati iusto temporibus atque nam quae qui quaerat sedveniam distinctio aut quidem pariatur ipsa at! lorem Lorem ipsum dolor sit amet consectetur"
    }
]

let educations = [
    {
        id:0,
        title: "Akdeniz Üniversitesi",
        section: "Bilgisayar Programcılığı",
        date: "2017-2019"
    },
    {
        id:1,
        title: "Akdeniz Üniversitesi",
        section: "Bilgisayar Programcılığı",
        date: "2017-2019"
    }
]

let certificate = [
    {
        id:0,
        title: "HTML sertifikası",
        date: "2019"
    }
]

let reference = [
    {
        id:0,
        name: "Taner Saydam",
        position: "Software Trainerr",
        number: "0555 555 55 52"
    }
]

let language = [
    {
        id:0,
        title: "Ingilizce"

    },
    {
        id:1,
        title: "fransızca"

    }
]





app.get("", (req, res) => {
    res.json({ message: "Api çalışıyor" })
})

// app.get("/api/getmyskills",(req,res)=>{
//     res.json(skills);
// })
app.get("/api/get", (req, res) => {
    const myInformation = {
        person: person,
        skills: skills,
        socialMedias: socialMedias,
        workExpiriences: workExpiriences,
        educations: educations,
        certificate: certificate,
        reference: reference,
        language: language
    }
    res.json(myInformation)
})

app.post("/api/set", (req, res) => {
    const body = req.body;
    person = body.person;
    skills = body.skills;
    socialMedias = body.socialMedias;
    workExpiriences = body.workExpiriences;
    educations = body.educations;
    certificate = body.certificate;
    reference = body.reference;
    language = body.language;
    res.json({ message: "update is successful" })
})

app.listen(5000, () => console.log("uygulama https://localhost:5000 üzerinden ayakta"))