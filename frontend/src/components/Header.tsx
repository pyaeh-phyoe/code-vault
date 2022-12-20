interface Props {
    title: string;
    imgSrc: string;
}

const Header = ({ title, imgSrc }: Props) => {
    return (
        <div className='flex bg-secondaryColor'>
            <div className='flex p-2.5 pr-5	bg-primaryColor'>
                <span className='mx-2.5 w-6 h-6 inline-block bg-contain' style={{backgroundImage: `url(${imgSrc})`}}></span>
                <h2>{title}</h2>
            </div>
        </div>
    );
}

export default Header;

