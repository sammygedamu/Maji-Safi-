
import React from 'react';

// Twitter X Logo
const TwitterIcon = (props: React.ComponentProps<'svg'>) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g></svg>
);
const LinkedInIcon = (props: React.ComponentProps<'svg'>) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}><g><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.25 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93-.91 0-1.38.61-1.38 1.93V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.28.93 3.28 4.38V19z"></path></g></svg>
);
const InstagramIcon = (props: React.ComponentProps<'svg'>) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}><g><path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 011.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122s-.013 3.056-.06 4.122c-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772 4.915 4.915 0 01-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06s-3.056-.013-4.122-.06c-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12s.013-3.056.06-4.122c.05-1.065.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.8a9.902 9.902 0 00-4.058.056c-1.03.048-1.597.21-2.02.38-.456.18-.804.4-.1.173a3.1 3.1 0 00-1.173.1c-.37.37-.694.72-.875 1.173-.17.424-.332.99-.38 2.02C3.813 8.944 3.8 9.283 3.8 12s.013 3.056.056 4.058c.048 1.03.21 1.597.38 2.02.18.456.4.804.875 1.173.37.37.72.694 1.173.875.423.17.99.332 2.02.38 1.004.043 1.343.056 4.058.056s3.054-.013 4.058-.056c1.03-.048 1.597-.21 2.02-.38.456-.18.804-.4 1.173-.875.37-.37.694-.72.875-1.173.17-.424-.332.99-.38-2.02.043-1.004.056-1.343.056-4.058s-.013-3.054-.056-4.058c-.048-1.03-.21-1.597-.38-2.02a3.1 3.1 0 00-.875-1.173c-.37-.37-.72-.694-1.173-.875-.423-.17-.99-.332-2.02-.38C15.056 3.813 14.717 3.8 12 3.8zm0 5.4a4.8 4.8 0 100 9.6 4.8 4.8 0 000-9.6zm0 7.8a3 3 0 110-6 3 3 0 010 6zm6.4-9.3a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4z"></path></g></svg>
);

const DefaultIcon = (props: React.ComponentProps<'svg'>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
    </svg>
);


export const PlatformIcon = ({ platform, ...props }: { platform: string } & React.ComponentProps<'svg'>) => {
    const platformLower = platform.toLowerCase();

    if (platformLower.includes('twitter')) {
        return <TwitterIcon fill="currentColor" {...props} />;
    }
    if (platformLower.includes('linkedin')) {
        return <LinkedInIcon fill="currentColor" {...props} />;
    }
    if (platformLower.includes('instagram')) {
        return <InstagramIcon fill="currentColor" {...props} />;
    }
    return <DefaultIcon stroke="currentColor" fill="none" {...props} />;
};
