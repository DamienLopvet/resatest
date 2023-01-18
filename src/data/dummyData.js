
let dateNow = new Date()



const dates =[]
for (let i = 0; i < 7; i++) {
dates[i] = {start:null, end:null}
dates[i].start = new Date(dateNow.setDate(dateNow.getDate()+i)).toISOString()
dates[i].end = new Date(dateNow.setDate(dateNow.getDate()+i + 2 )).toISOString()
    
}


const dummyEvents=[
    {
        "kind": "calendar#event",
        "etag": "\"3343443178654000\"",
        "id": "b9cqdi2l0gi3a93qsonuuijo7o",
        "status": "confirmed",
        "htmlLink": "https://www.google.com/calendar/event?eid=YjljcWRpMmwwZ2kzYTkzcXNvbnV1aWpvN28gbGFtYWRlc3Jlc2FAbQ",
        "created": "2022-12-22T15:06:19.000Z",
        "updated": "2022-12-22T15:06:29.327Z",
        "summary": "12 personnes, Chambres :2,4,6",
        "description": `{\"start\":{\"dateTime\":\"${dates[0].start}\",\"timeZone\":\"Europe/Paris\"},\"end\":{\"dateTime\":\"${dates[0].end}\",\"timeZone\":\"Europe/Paris\"},\"NombrePersonne\":\"12\",\"paymentInfo\":\"Non_payé\",\"Nom\":\"beurrier\",\"Prenom\":\"Salomon\",\"Tel\":\"9685236589\",\"Email\":\"big@apple.no\",\"sendInvitationToClient\":false}`,
        "creator": {
            "email": "lamadesresa@gmail.com",
            "self": true
        },
        "organizer": {
            "email": "lamadesresa@gmail.com",
            "self": true
        },
        "start": {
            "dateTime": dates[0].start ,
            "timeZone": "Europe/Paris"
        },
        "end": {
            "dateTime": dates[0].end,
            "timeZone": "Europe/Paris"
        },
        "iCalUID": "b9cqdi2l0gi3a93qsonuuijo7o@google.com",
        "sequence": 0,
        "reminders": {
            "useDefault": true
        },
        "eventType": "default",
        "idx": 0
    },
    {
        "kind": "calendar#event",
        "etag": "\"3343601961034000\"",
        "id": "a4saq3dql5or2nughftspl7gjg",
        "status": "confirmed",
        "htmlLink": "https://www.google.com/calendar/event?eid=YTRzYXEzZHFsNW9yMm51Z2hmdHNwbDdnamcgbGFtYWRlc3Jlc2FAbQ",
        "created": "2022-12-23T13:09:40.000Z",
        "updated": "2022-12-23T13:09:40.517Z",
        "summary": "9 personnes, Chambres :5,7",
        "description": `{\"start\":{\"dateTime\":\"${dates[1].start}\",\"timeZone\":\"Europe/Paris\"},\"end\":{\"dateTime\":\"${dates[1].start}\",\"timeZone\":\"Europe/Paris\"},\"NombrePersonne\":\"9\",\"paymentInfo\":\"Paiement_partiel\",\"Nom\":\"Reiner\",\"Prenom\":\"Jose\",\"Tel\":\"+3376328353465\",\"Email\":\"\",\"sendInvitationToClient\":false}`,
        "creator": {
            "email": "lamadesresa@gmail.com",
            "self": true
        },
        "organizer": {
            "email": "lamadesresa@gmail.com",
            "self": true
        },
        "start": {
            "dateTime": dates[1].start,
            "timeZone": "Europe/Paris"
        },
        "end": {
            "dateTime": dates[1].end,
            "timeZone": "Europe/Paris"
        },
        "iCalUID": "a4saq3dql5or2nughftspl7gjg@google.com",
        "sequence": 0,
        "reminders": {
            "useDefault": true
        },
        "eventType": "default",
        "idx": 1
    },
    {
        "kind": "calendar#event",
        "etag": "\"3343437161752000\"",
        "id": "nbk4v4u89u08akcpa5ljhufmd8",
        "status": "confirmed",
        "htmlLink": "https://www.google.com/calendar/event?eid=bmJrNHY0dTg5dTA4YWtjcGE1bGpodWZtZDggbGFtYWRlc3Jlc2FAbQ",
        "created": "2022-12-22T14:16:20.000Z",
        "updated": "2022-12-22T14:16:20.876Z",
        "summary": "8 personnes, Chambres :1,3",
        "description": `{\"start\":{\"dateTime\":\"${dates[2].start}\",\"timeZone\":\"Europe/Paris\"},\"end\":{\"dateTime\":\"${dates[2].end}\",\"timeZone\":\"Europe/Paris\"},\"NombrePersonne\":\"8\",\"paymentInfo\":\"Paiement_partiel\",\"Nom\":\"Taboule\",\"Prenom\":\"Semoune\",\"Tel\":\"046983 43524\",\"Email\":\"sqdgsq@sdg.f\",\"sendInvitationToClient\":false}`,
        "creator": {
            "email": "lamadesresa@gmail.com",
            "self": true
        },
        "organizer": {
            "email": "lamadesresa@gmail.com",
            "self": true
        },
        "start": {
            "dateTime": dates[2].start,
            "timeZone": "Europe/Paris"
        },
        "end": {
            "dateTime": dates[2].end,
            "timeZone": "Europe/Paris"
        },
        "iCalUID": "nbk4v4u89u08akcpa5ljhufmd8@google.com",
        "sequence": 0,
        "reminders": {
            "useDefault": true
        },
        "eventType": "default",
        "idx": 2
    },
    {
        "kind": "calendar#event",
        "etag": "\"3346319821750000\"",
        "id": "59dn5f44oc5mjupk8767o8r5ac",
        "status": "confirmed",
        "htmlLink": "https://www.google.com/calendar/event?eid=NTlkbjVmNDRvYzVtanVwazg3NjdvOHI1YWMgbGFtYWRlc3Jlc2FAbQ",
        "created": "2023-01-08T06:38:30.000Z",
        "updated": "2023-01-08T06:38:30.875Z",
        "summary": "2 personnes, Chambres :1,2",
        "description": `{\"start\":{\"dateTime\":\"${dates[3].start}\",\"timeZone\":\"Europe/Paris\"},\"end\":{\"dateTime\":\"2023-01${dates[3].end}Europe/Paris\"},\"NombrePersonne\":\"2\",\"paymentInfo\":\"Paiement_partiel\",\"Nom\":\"Abel\",\"Prenom\":\"Jerome\",\"Tel\":\"09389405998\",\"Email\":\"abel.jerome@free.fr\",\"sendInvitationToClient\":false}`,
        "creator": {
            "email": "lamadesresa@gmail.com",
            "self": true
        },
        "organizer": {
            "email": "lamadesresa@gmail.com",
            "self": true
        },
        "start": {
            "dateTime": dates[3].start,
            "timeZone": "Europe/Paris"
        },
        "end": {
            "dateTime": dates[3].end,
            "timeZone": "Europe/Paris"
        },
        "iCalUID": "59dn5f44oc5mjupk8767o8r5ac@google.com",
        "sequence": 0,
        "reminders": {
            "useDefault": true
        },
        "eventType": "default",
        "idx": 3
    },
    {
        "kind": "calendar#event",
        "etag": "\"3346320704776000\"",
        "id": "t7hh8bjl0ke95ndq3t379n7l9g",
        "status": "confirmed",
        "htmlLink": "https://www.google.com/calendar/event?eid=dDdoaDhiamwwa2U5NW5kcTN0Mzc5bjdsOWcgbGFtYWRlc3Jlc2FAbQ",
        "created": "2023-01-08T06:39:35.000Z",
        "updated": "2023-01-08T06:45:52.388Z",
        "summary": "3 personnes, Chambres :1,3,1,3",
        "description": `{\"start\":{\"dateTime\":\"${dates[4].start}\",\"timeZone\":\"Europe/Paris\"},\"end\":{\"dateTime\":\"${dates[4].end}\",\"timeZone\":\"Europe/Paris\"},\"NombrePersonne\":\"3\",\"paymentInfo\":\"Non_payé\",\"Nom\":\"Carhart\",\"Prenom\":\"Joséphine\",\"Tel\":\"9384758694\",\"Email\":\"carhart.josefine@yahoo.com\",\"sendInvitationToClient\":false}`,
        "creator": {
            "email": "lamadesresa@gmail.com",
            "self": true
        },
        "organizer": {
            "email": "lamadesresa@gmail.com",
            "self": true
        },
        "start": {
            "dateTime": dates[4].start,
            "timeZone": "Europe/Paris"
        },
        "end": {
            "dateTime": dates[4].end,
            "timeZone": "Europe/Paris"
        },
        "iCalUID": "t7hh8bjl0ke95ndq3t379n7l9g@google.com",
        "sequence": 0,
        "reminders": {
            "useDefault": true
        },
        "eventType": "default",
        "idx": 4
    },
    {
        "kind": "calendar#event",
        "etag": "\"3346320222030000\"",
        "id": "p26m5nvrpkvvoc6hgjsaubrll4",
        "status": "confirmed",
        "htmlLink": "https://www.google.com/calendar/event?eid=cDI2bTVudnJwa3Z2b2M2aGdqc2F1YnJsbDQgbGFtYWRlc3Jlc2FAbQ",
        "created": "2023-01-08T06:41:51.000Z",
        "updated": "2023-01-08T06:41:51.015Z",
        "summary": "10 personnes, Chambres :1,3,5,7",
        "description": `{\"start\":{\"dateTime\":\"${dates[5].start}\",\"timeZone\":\"Europe/Paris\"},\"end\":{\"dateTime\":\"${dates[5].end}\",\"timeZone\":\"Europe/Paris\"},\"NombrePersonne\":\"10\",\"paymentInfo\":\"Paiement_complet\",\"Nom\":\"Duninghan\",\"Prenom\":\"Billy\",\"Tel\":\"23948575869\",\"Email\":\"billyduninghan@gmail.fr\",\"sendInvitationToClient\":false}`,
        "creator": {
            "email": "lamadesresa@gmail.com",
            "self": true
        },
        "organizer": {
            "email": "lamadesresa@gmail.com",
            "self": true
        },
        "start": {
            "dateTime": dates[5].start,
            "timeZone": "Europe/Paris"
        },
        "end": {
            "dateTime": dates[5].end,
            "timeZone": "Europe/Paris"
        },
        "iCalUID": "p26m5nvrpkvvoc6hgjsaubrll4@google.com",
        "sequence": 0,
        "reminders": {
            "useDefault": true
        },
        "eventType": "default",
        "idx": 5
    },
    {
        "kind": "calendar#event",
        "etag": "\"3346320684506000\"",
        "id": "94h77gj8j5q0kotjao05i718pk",
        "status": "confirmed",
        "htmlLink": "https://www.google.com/calendar/event?eid=OTRoNzdnajhqNXEwa290amFvMDVpNzE4cGsgbGFtYWRlc3Jlc2FAbQ",
        "created": "2023-01-08T06:45:42.000Z",
        "updated": "2023-01-08T06:45:42.253Z",
        "summary": "8 personnes, Chambres :4,2",
        "description": `{\"start\":{\"dateTime\":\"${dates[6].start}\",\"timeZone\":\"Europe/Paris\"},\"end\":{\"dateTime\":\"${dates[6].end}\",\"timeZone\":\"Europe/Paris\"},\"NombrePersonne\":\"8\",\"paymentInfo\":\"Non_payé\",\"Nom\":\"Fiji\",\"Prenom\":\"Guy\",\"Tel\":\"0694869486\",\"Email\":\"figiguy@aloa.com\",\"sendInvitationToClient\":false}`,
        "creator": {
            "email": "lamadesresa@gmail.com",
            "self": true
        },
        "organizer": {
            "email": "lamadesresa@gmail.com",
            "self": true
        },
        "start": {
            "dateTime": dates[6].start,
            "timeZone": "Europe/Paris"
        },
        "end": {
            "dateTime": dates[6].end,
            "timeZone": "Europe/Paris"
        },
        "iCalUID": "94h77gj8j5q0kotjao05i718pk@google.com",
        "sequence": 0,
        "reminders": {
            "useDefault": true
        },
        "eventType": "default",
        "idx": 6
    }
]

export default {dummyEvents}