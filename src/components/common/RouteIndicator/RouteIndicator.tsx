import React from 'react';
import classNameProp from 'class-name-prop';
import { useRouter } from 'next/router';
import styles from './RouteIndicator.module.css';

const DONE_DURATION = 250;

export default function RouteIndicator() {
    const router = useRouter();

    const [loading, setLoading] = React.useState<boolean | null>(null);
    const [timeoutId, setTimeoutId] = React.useState(null);

    const onRouteChangeStart = React.useCallback(() => {
        setLoading(true);
    }, []);

    const onRouteChangeDone = React.useCallback(() => {
        setLoading(false);
        setTimeoutId(
            setTimeout(() => {
                setTimeoutId(null);
                setLoading(null);
            }, DONE_DURATION),
        );
    }, []);

    React.useEffect(() => {
        router.events.on('routeChangeStart', onRouteChangeStart);
        router.events.on('routeChangeComplete', onRouteChangeDone);
        router.events.on('routeChangeError', onRouteChangeDone);

        return () => {
            router.events.off('routeChangeStart', onRouteChangeStart);
            router.events.off('routeChangeComplete', onRouteChangeDone);
            router.events.off('routeChangeError', onRouteChangeDone);
        };
    }, [onRouteChangeDone, onRouteChangeStart, router.events]);

    React.useEffect(
        () => () => {
            if (timeoutId) clearTimeout(timeoutId);
        },
        [timeoutId],
    );

    return (
        <div
            className={classNameProp(
                styles.indicator,
                loading !== null && (loading ? styles.loading : styles.done),
            )}
            style={{ '--RouteIndicator-done-duration': `${DONE_DURATION}ms` }}
        />
    );
}
