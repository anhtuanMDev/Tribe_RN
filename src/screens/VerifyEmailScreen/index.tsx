import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Icon, InputCode, KeyboardAvoidingView, Typography } from '../../components';
import { fonts } from '../../config/constants';
import { pallet } from '../../config/pallet';
import { convertAlpha } from '../../utils';
import ResendCode from './components/ResendCode';
import { useVerifyEmail } from './hooks/useVerifyEmail';
import { useCredential } from '../../navigation/flows/flowCredential/context';

const VerifyEmailScreen = () => {
    const { mutate: verifyEmail } = useVerifyEmail();
    const { state } = useCredential();

    const handleVerifyEmail = (code: string) => {
        verifyEmail({ email: state.email ?? '', code });
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView>
                <Button
                    level='ghost'
                    focusable={false}
                    style={styles.backButton}
                    leftIcon={<Icon name='arrow' size={24} color={pallet.primary} />} />

                <View style={styles.iconContainer}>
                    <View style={styles.iconAnimation} />
                    <View style={styles.iconWrapper}>
                        <Icon
                            size={32}
                            name='email_validation_success'
                            color={pallet.variant.primary['600']} />
                    </View>
                    <View style={styles.lockWrapper}>
                        <Icon name='lock' size={24} color={pallet.variant.tertiary['600']} />
                    </View>
                </View>

                <Typography style={styles.subtitle} level="headlineLarge">
                    Verify Your Email
                </Typography>

                <Typography style={styles.body} level="bodyMedium">
                    We've sent a 6-digit code to your
                    email. Enter it below to continue.
                </Typography>

                <InputCode onFinsh={handleVerifyEmail} length={6} />

                <Typography style={styles.contextText} level='labelMedium'>Didn't receive a code?</Typography>

                <ResendCode />
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default VerifyEmailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: pallet.background,
        paddingHorizontal: 24,
        paddingTop: 37
    },


    backButton: { backgroundColor: pallet.variant.neutral['50'] },

    iconWrapper: {
        width: 64,
        height: 64,
        borderRadius: 100,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: pallet.variant.primary['400'],
    },

    lockWrapper: {
        position: 'absolute',
        bottom: -4,
        right: -4,
        width: 40,
        height: 40,
        borderRadius: 100,
        backgroundColor: pallet.variant.tertiary['100'],
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: pallet.variant.tertiary['100'],
    },

    iconContainer: {
        width: 96,
        height: 96,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 37,
        marginBottom: 40,
        alignSelf: 'center',
    },

    iconAnimation: {
        width: '100%',
        height: '100%',
        borderRadius: 100,
        backgroundColor: convertAlpha(20, pallet.variant.primary['50']),
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -50 }, { translateY: -50 }],
        zIndex: 0,
    },

    subtitle: {
        fontFamily: fonts.literata.semiBold,
        color: pallet.variant.neutral['1000'],
        marginBottom: 12,
        textAlign: 'center',
    },

    body: {
        fontFamily: fonts.literata.regular,
        color: pallet.variant.neutral['1000'],
        textAlign: 'center',
        marginHorizontal: 20,
        marginBottom: 48
    },

    contextText: {
        textAlign: 'center',
        marginTop: 40,
        marginBottom: 8,
        fontFamily: fonts.nunito.regular,
    },


});
