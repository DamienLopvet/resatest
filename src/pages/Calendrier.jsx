import React from 'react'

export default function Calendrier() {
  return (
    <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Europe%2FParis&showNav=1&showTitle=0&showPrint=0&showCalendars=0&showTz=0&mode=AGENDA&src=bGFtYWRlc3Jlc2FAZ21haWwuY29t&src=ZnIuZnJlbmNoI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%230B8043" 
    width="800" height="600" frameborder="0"
     className=' h-[90vh] mt-5 opacity-80 rounded
     xs:ml-none 
     xs:w-[100%]
     xs:px-1 
     xl:w-[calc(100%-320px)]
     xl:ml-80 '></iframe>
  )
}
