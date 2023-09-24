
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const Schema = mongoose.Schema;
app.use(cors());
app.use(express.json())

const { v4: uuidv4 }=require("uuid")
//guid üretmek için kütüphane indirmeliyiz uuid
const uri = "mongodb+srv://ramazankurt:R12345@testdb.7s837kf.mongodb.net/";
const Personal=require("./models/personal")
mongoose.connect(uri).then(res=> {//connect bu şekilde yapıyoruz.
    console.log("Connection is successful")
});







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
        title: "C#",
        rate: 80
    },
    {
        title: "HTML",
        rate: 50
    },
    {
        title: "HTML",
        rate: 50
    },
    {
        title: "JAVA",
        rate: 50
    }
]

let socialMedias = [
    {
        title: "linkedin",
        link: "https://tr.linkedin.com/",
        icon: "fa fa-linkedin"
    },
    {
        title: "Youtube",
        link: "https://youtube.com/",
        icon: "fa fa-youtube"
    }
]

let workExperiences = [
    {
        title: "Web Developer",
        company: "Samsung",
        date: "2021",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugaquo tenetur. Ab, quibusdam iste obcaecati iusto temporibus atque nam quae qui quaerat sedveniam distinctio aut quidem pariatur ipsa at! lorem Lorem ipsum dolor sit amet consectetur"
    },
    {
        title: "Web Developer",
        company: "Samsung",
        date: "2021",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugaquo tenetur. Ab, quibusdam iste obcaecati iusto temporibus atque nam quae qui quaerat sedveniam distinctio aut quidem pariatur ipsa at! lorem Lorem ipsum dolor sit amet consectetur"
    }, {
        title: "Web Developer",
        company: "Samsung",
        date: "2021",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugaquo tenetur. Ab, quibusdam iste obcaecati iusto temporibus atque nam quae qui quaerat sedveniam distinctio aut quidem pariatur ipsa at! lorem Lorem ipsum dolor sit amet consectetur"
    }
]

let educations = [
    {
        title: "Akdeniz Üniversitesi",
        section: "Bilgisayar Programcılığı",
        date: "2017-2019"
    },
    {
        title: "Akdeniz Üniversitesi",
        section: "Bilgisayar Programcılığı",
        date: "2017-2019"
    }
]

let certificate = [
    {
        title: "HTML sertifikası",
        date: "2019"
    }
]

let reference = [
    {
        name: "Taner Saydam",
        position: "Software Trainerr",
        number: "0555 555 55 52"
    }
]

let language = [
    {
        title: "Ingilizce"

    },
    {
        title: "fransızca"

    }
]


app.get("/api/createDefaultValue", async (req,res)=>{
    let personModel= await Person.findOne();
    if(personModel===null)
    {
        personModel=new Person(person)
        await personModel.save();
    }

    for(let s of skills)
    {
        let skill = await Skill.findOne({title: s.title})
        if(skill === null)
        {
            skill=new Skill(s);
            skill._id=uuidv4();
            await skill.save();
        }
    }

    for(let s of socialMedias)
    {
        let socialMedia = await SocialMedia.findOne({title: s.title})
        if(socialMedia === null)
        {
            socialMedia=new SocialMedia(s);
            socialMedia._id=uuidv4();
            await socialMedia.save();
        }
    }


    for(let w of workExperiences)
    {
        let workExperience = await WorkExperience.findOne({title: w.title, company: w.company,date: w.date,description: w.description})
        if(workExperience === null)
        {
            workExperience=new WorkExperience(w);
            workExperience._id=uuidv4();
            await workExperience.save();
        }
    }
    for(let e of educations)
    {
        let education = await Education.findOne({title: e.title, section: e.section,date: e.date})
        if(education === null)
        {
            education=new Education(e);
            education._id=uuidv4();
            await education.save();
        }
    }

    for(let c of certificate)
    {
        let certifi = await Certificate.findOne({title: c.title})
        if(certifi === null)
        {
            certifi=new Certificate(c);
            certifi._id=uuidv4();
            await certifi.save();
        }
    }

    for(let r of reference)
    {
        let ref = await Reference.findOne({name: r.name})
        if(ref === null)
        {
            ref=new Reference(r);
            ref._id=uuidv4();
            await ref.save();
        }
    }

    for(let l of language)
    {
        let lang = await Language.findOne({title: l.title})
        if(lang === null)
        {
            lang=new Language(l);
            lang._id=uuidv4();
            await lang.save();
        }
    }
    res.json({message:"Create default value is successful"})
})


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
        workExperiences: workExperiences,
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
    workExperiences = body.workExperiences;
    educations = body.educations;
    certificate = body.certificate;
    reference = body.reference;
    language = body.language;
    res.json({ message: "update is successful" })
})

//const port =process.env.PORT || 3000;

app.listen(5001, () => console.log("http://localhost:5001 uygulama  üzerinden ayakta"))