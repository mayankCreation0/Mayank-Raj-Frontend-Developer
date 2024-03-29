import { useState, useEffect } from 'react';
import '../Styles/Banner.css';

const Banner = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [
        {
            imageUrl: 'https://sxcontent9668.azureedge.us/cms-assets/assets/SES_18_19_presssite_DSC_2850_417e27436e.jpg',
            text: 'RECENT LAUNCHSES- 18 AND SES - 19 MISSION',
            buttonText: 'Rewatch',
            buttonLink: 'https://www.spacex.com/updates/#sustained-lunar-exploration'
        },
        {
            imageUrl: 'https://sxcontent9668.azureedge.us/cms-assets/assets/home_Starlink_2_8_Launch_230317_desktop_dsc00028_c6e9477498.JPG',
            text: 'STARLINK MISSION',
            buttonText: 'Rewatch',
            buttonLink: 'https://www.spacex.com/updates/#sustained-lunar-exploration'
        },
        {
            imageUrl: 'https://sxcontent9668.azureedge.us/cms-assets/assets/Crew_5_Crew_Desktop_a8940419b8.jpg',
            text: 'CRS-27 MISSION',
            buttonText: 'Rewatch',
            buttonLink: 'https://www.spacex.com/updates/#sustained-lunar-exploration'
        },
        {
            imageUrl: 'https://sxcontent9668.azureedge.us/cms-assets/assets/CRS_27_astronautrd_streak_desktop_90cbf7ea69.jpg',
            text: 'CREW-5 MISSION',
            buttonText: 'Rewatch',
            buttonLink: 'https://www.spacex.com/updates/#sustained-lunar-exploration'
        },
        {
            imageUrl: 'https://sxcontent9668.azureedge.us/cms-assets/assets/Homepage_Desktop_5ebdeb0c6c.webp',
            text: 'STARSHIP UPDATE',
            buttonText: 'Rewatch',
            buttonLink: 'https://www.spacex.com/updates/#sustained-lunar-exploration'
        },
        // 'https://sxcontent9668.azureedge.us/cms-assets/assets/SES_18_19_presssite_DSC_2850_417e27436e.jpg',
        // 'https://sxcontent9668.azureedge.us/cms-assets/assets/home_Starlink_2_8_Launch_230317_desktop_dsc00028_c6e9477498.JPG',
        // 'https://sxcontent9668.azureedge.us/cms-assets/assets/Crew_5_Crew_Desktop_a8940419b8.jpg',
        // 'https://sxcontent9668.azureedge.us/cms-assets/assets/CRS_27_astronautrd_streak_desktop_90cbf7ea69.jpg',
        // 'https://sxcontent9668.azureedge.us/cms-assets/assets/Homepage_Desktop_5ebdeb0c6c.webp'
    ];

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((currentImageIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(intervalId);
    }, [currentImageIndex]);

    return (
        <>
            <div className="banner" id='banner'>
                {images.map((currentBanner, index) => (
                    // eslint-disable-next-line jsx-a11y/img-redundant-alt, react/jsx-no-comment-textnodes
                    <div className='banner-main'>
                        <img
                            key={index}
                            className={currentImageIndex === index ? 'visible' : 'hidden'}
                            src={currentBanner.imageUrl}
                            alt={`Banner Image ${index}`}
                        />
                        {currentImageIndex === index ? <div className="banner-btn">
                            <p>{currentBanner.text}</p>
                            <a href={currentBanner.buttonLink} style={{ textDecoration: 'none', color: 'white' }}>
                                <button className='btn-banner'>
                                    {currentBanner.buttonText}
                                </button></a>
                        </div> : null}
                    </div>
                ))}
                {/* <img src={currentBanner.imageUrl} alt={`Banner Image ${currentImageIndex}`} /> */}

            </div>
            {/* <About/>
        <Search/> */}
        </>
    );
};

export default Banner;
