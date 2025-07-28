import { useNavigate } from "react-router-dom";
import config from "../Config"; 

const baseUrl = config.BASE_URL;
const UserHome = () => {
  const navigate = useNavigate();

   const goToMens= () => {
    navigate("/category/Mens-Collection");
  };
  const goToLehenga = () => {
    navigate("/category/Lehenga");
  };
  const goToGown= () => {
    navigate("/category/Gown");
  };
  const goToAnarkali= () => {
    navigate("/category/Anarkali");
  };
   const goToSherwani= () => {
    navigate("/category/Sherwani");
  };
const MensIndoWestern= () => {
    navigate("/category/Mens-Indo-Western");
  };
   const goToTuxedo= () => {
    navigate("/category/Tuxedo");
  };

  const steps = [
    "Bookings via physical stores and website",
    "Doorstep delivery and pickup across 30+ cities",
    "4 day rentals at 1/10th of the M.R.P.",
    "In-store trials and customisations",
  ];
  return (
    <div>
     <div style={styles.bannerContainer}>
        <img
          onClick={goToLehenga}
          src="/lehngal.jpg"
          alt="Left Couple"
          style={styles.imgStyle}
        />
       <img
          onClick={goToGown}
          src="/gown.jpg"
          alt="Left Couple"
         style={styles.imgStyle}
        />
        <img
        onClick={goToAnarkali}
          src="/anarkali.jpg"
          alt="Right Couple"
          style={styles.imgStyle}
        />
        </div>
        <div style={styles.bannerContainer}>
        <img
        onClick={goToSherwani}
          src="/sherwani.jpg"
          alt="Left Couple"
          style={styles.imgStyle}
        />
       <img
         onClick={MensIndoWestern}
          src="/menindowestern.png"
          alt="Left Couple"
         style={styles.imgStyle}
        />
        <img
        onClick={goToTuxedo}
          src="/tuxedo.png"
          alt="Right Couple"
          style={styles.imgStyle}
        />
      </div>
   <div>
      <div style={styles.chatIcon}>
        
     <section style={styles.sectionStyle}>
      <div style={styles.containerStyle}>
        <div style={styles.pointsContainer}>
          {steps.map((step, index) => (
            <div key={index} style={styles.pointStyle}>
              <span style={styles.circleStyle}>{index + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>

        <div style={styles.imageTextContainer}>
          <img
            src="/girl.jpg"
            alt="Rental Couple"
            style={styles.imageStyle}
          />
          <div style={styles.textOverlay}>
            <h1 style={styles.headingStyle}>RENTAL</h1>
            <h2 style={styles.subHeadingStyle}>Process</h2>
          </div>
        </div>
      </div>
    </section>
      </div>
      </div>
      <div onClick={goToMens} style={styles.mens}>
        <img src="/menswear.png" alt="Left Couple" style={styles.mensimg} />
      </div>
    <div style={styles.containerbox}>
      <h2 style={styles.heading}>WHY CHOOSE VASTRAA?</h2>
      <div style={styles.contentWrapper}>
        <img
          src="/ansu.jpg" 
          alt="Profile"
          style={styles.profileImg}
        />
        <div>
          <div style={styles.quotesIcon}>❝❞</div>
          <p style={styles.quote}>
        "VASTRAA BRINGS A NEW ERA OF RESPONSIBLE FASHION.
         WHETHER YOU WANT TO RENT A GORGEOUS OUTFIT FOR YOUR BIG DAY, OR DONATE YOUR CHERISHED DRESSES TO BRIGHTEN SOMEONE ELSE'S, WE MAKE IT SEAMLESS.
         EVERY DRESS YOU RENT OR GIVE CARRIES EMOTION — LAUGHTER, BLESSINGS, AND WARMTH.
         CHOOSE VASTRAA — WHERE EVERY THREAD WEAVES A NEW STORY."          </p>
          <p style={styles.name}>Anshu Malviya</p>
        </div>
      </div>
    </div>
      <div style={styles.rightBox}>
        <img
          src="/call.jpg" 
          alt="Fashion Emergency"
          style={styles.image}
        />
      </div>
    </div>
  );
};
 
const styles = {
  heading: {
    textAlign: "center",
    marginBottom: "40px",
    fontSize: "28px",
    color: "#333",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "30px",
  },
  container: {
      fontFamily: "'Segoe UI', sans-serif",
      backgroundColor: '#fff',
      color: '#000',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 40px',
      borderBottom: '1px solid #ccc',
    },
    logo: {
      fontSize: '24px',
      fontWeight: 'bold',
    },
    nav: {
      display: 'flex',
      gap: '15px',
      fontWeight: 'bold',
    },
    navLink: {
      textDecoration: 'none',
      color: '#000',
      paddingBottom: '2px',
    },
    activeLink: {
      borderBottom: '2px solid black',
    },
    icons: {
      display: 'flex',
      gap: '20px',
      fontSize: '20px',
      cursor: 'pointer',
    },
    bannerContainer : {
   
    display: "flex",
   margin:"10px",
    alignItems: "center",
    backgroundColor: "#fef9f6",
    padding: "0 100px",
  },

  imgStyle: {
    padding:"15px",
   width:"450px",
   height:"400px",
    objectFit: "cover",
  },
    
    chatIcon: {
      width : "1380px",
      marginLeft:"63px",
      alignItems: 'center',
      gap: '2px',
    },
    chatBubble: {
      background: 'white',
      padding: '8px 12px',
      borderRadius: '12px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
      fontSize: '14px',
    },
    notification: {
      background: 'red',
      color: 'white',
      borderRadius: '50%',
      fontSize: '12px',
      width: '18px',
      height: '18px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
   sectionStyle:{
    background: "#fdf7f3",
    padding: "40px 20px",
    fontFamily: "'Segoe UI', sans-serif",
  },

  containerStyle: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "1200px",
    margin: "auto",
  },
  pointsContainer:{
    flex: 1,
    minWidth: "300px",
  },

   pointStyle:{
    display: "flex",
    alignItems: "center",
    background: "white",
    margin: "10px 0",
    padding: "10px 15px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.05)",
  },

   circleStyle: {
    width: "30px",
    height: "30px",
    backgroundColor: "#e6d1bb",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    marginRight: "15px",
  },

  imageTextContainer : {
    position: "relative",
    marginLeft:"50px",
    flex: 1,
    minWidth: "25px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

   imageStyle:{
    maxWidth: "100%",
    height: "auto",
  },

   textOverlay: {
    position: "absolute",
    right: "30px",
    textAlign: "right",
  },

   headingStyle: {
    fontSize: "50px",
    marginBottom:"1px",
    marginRight:"330px",
    color: "#3a2614",
  },

  subHeadingStyle:{
    fontSize: "32px",
    marginRight:"390px",
     marginBottom:"50px",
    color: "#3a2614",
  },
  mensimg:{
  display:"flex",
  justifycontent:"space-between",
  alignitems: "center",
  backgroundcolor: "#f7f0e8",
  padding: "40px 70px",
  borderradius: "10px",
  backgroundrepeat: "no-repeat",
  backgroundposition: "top left",
 
},
containerbox: {
      textAlign: "center",
      padding: "40px 20px",
    },
    heading: {
      color: "#7B2D35",
      fontSize: "28px",
      fontWeight: "bold",
      marginBottom: "30px",
      letterSpacing: "1px",
    },
    contentWrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "30px",
      maxWidth: "1000px",
      margin: "0 auto",
      flexWrap: "wrap",
    },
    profileImg: {
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      objectFit: "cover",
    },
    quote: {
      fontSize: "14px",
      color: "#555",
      textAlign: "left",
      lineHeight: "1.8",
      maxWidth: "600px",
    },
    name: {
      color: "#7B2D35",
      fontWeight: "bold",
      marginTop: "15px",
      textAlign: "left",
    },
    quotesIcon: {
      fontSize: "40px",
      color: "#ccc",
      marginBottom: "10px",
    },
    rightBox: {
      textAlign: 'center',
    },
    image: {
      MaxHeight: '100px',
      width: '1400px',
    },
  };


  

export default UserHome;
