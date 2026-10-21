import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  BackHandler,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
  Platform,
  Alert,
  Share,
  Linking,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { WebView } from 'react-native-webview';

// Default portal URL - Point to your deployed website URL or local network IP
const PORTAL_URL = 'https://oics-institute.vercel.app';

export default function App() {
  const webViewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(PORTAL_URL);
  const [refreshing, setRefreshing] = useState(false);

  // Handle Android Hardware Back Button
  useEffect(() => {
    if (Platform.OS === 'android') {
      const onBackPress = () => {
        if (canGoBack && webViewRef.current) {
          webViewRef.current.goBack();
          return true;
        } else {
          Alert.alert(
            'Exit OICS App',
            'Do you want to exit Odisha Institute of Computer Studies app?',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Exit', onPress: () => BackHandler.exitApp() },
            ],
            { cancelable: true }
          );
          return true;
        }
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );
      return () => subscription.remove();
    }
  }, [canGoBack]);

  // Handle Share Portal link
  const handleShare = async () => {
    try {
      await Share.share({
        title: 'OICS Institute - Official Portal',
        message:
          'Verify certificates and explore courses at Odisha Institute of Computer Studies (OICS): ' +
          currentUrl,
        url: currentUrl,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  // Pull to refresh handler
  const onRefresh = () => {
    setRefreshing(true);
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
    setTimeout(() => {
      setRefreshing(false);
    }, 1200);
  };

  // Intercept links like WhatsApp, Tel, Mailto
  const handleShouldStartLoadWithRequest = (request) => {
    const { url } = request;

    // Handle Phone Calls
    if (url.startsWith('tel:')) {
      Linking.openURL(url);
      return false;
    }

    // Handle WhatsApp Links
    if (url.includes('wa.me') || url.includes('api.whatsapp.com') || url.startsWith('whatsapp://')) {
      Linking.openURL(url).catch(() => {
        Alert.alert('WhatsApp Not Installed', 'Please install WhatsApp to chat directly with OICS counselors.');
      });
      return false;
    }

    // Handle Mailto
    if (url.startsWith('mailto:')) {
      Linking.openURL(url);
      return false;
    }

    // Handle Download APK link directly
    if (url.endsWith('.apk')) {
      Linking.openURL(url);
      return false;
    }

    return true;
  };

  // Injected JavaScript for mobile styling polish
  const injectedJavaScript = `
    (function() {
      // Add mobile-app class to body
      document.body.classList.add('mobile-app-webview');
      
      // Ensure smooth mobile viewport behavior
      var meta = document.querySelector('meta[name="viewport"]');
      if (meta) {
        meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
      }
      
      true; // note: this is required, or you'll get a warning
    })();
  `;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#090d16" />

      {/* Top App Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoBadgeText}>O</Text>
          </View>
          <View>
            <View style={styles.titleRow}>
              <Text style={styles.headerTitle}>OICS</Text>
              <View style={styles.isoBadge}>
                <Text style={styles.isoText}>ISO 9001</Text>
              </View>
            </View>
            <Text style={styles.headerSubtitle}>Odisha Institute of Computer Studies</Text>
          </View>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onRefresh}
            activeOpacity={0.7}
          >
            <Text style={styles.iconButtonText}>↻</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleShare}
            activeOpacity={0.7}
          >
            <Text style={styles.iconButtonText}>↗</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main WebView Content */}
      <View style={styles.webViewContainer}>
        {isError ? (
          <ScrollView
            contentContainerStyle={styles.errorContainer}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#22d3ee" />
            }
          >
            <View style={styles.errorIconCircle}>
              <Text style={styles.errorIcon}>⚡</Text>
            </View>
            <Text style={styles.errorTitle}>Connection Problem</Text>
            <Text style={styles.errorMessage}>
              Could not connect to OICS portal server. Please check your mobile data or Wi-Fi connection.
            </Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={() => {
                setIsError(false);
                if (webViewRef.current) {
                  webViewRef.current.reload();
                }
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.retryButtonText}>Retry Connection</Text>
            </TouchableOpacity>
          </ScrollView>
        ) : (
          <WebView
            ref={webViewRef}
            source={{ uri: PORTAL_URL }}
            style={styles.webView}
            injectedJavaScript={injectedJavaScript}
            onNavigationStateChange={(navState) => {
              setCanGoBack(navState.canGoBack);
              setCurrentUrl(navState.url);
            }}
            onLoadStart={() => setIsLoading(true)}
            onLoadEnd={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setIsError(true);
            }}
            onHttpError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              if (nativeEvent.statusCode >= 500) {
                setIsError(true);
              }
            }}
            onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            scalesPageToFit={true}
            allowsInlineMediaPlayback={true}
            allowsBackForwardNavigationGestures={true}
            pullToRefreshEnabled={true}
            renderLoading={() => (
              <View style={styles.loaderContainer}>
                <View style={styles.loadingLogoBadge}>
                  <Text style={styles.loadingLogoText}>OICS</Text>
                </View>
                <ActivityIndicator size="large" color="#06b6d4" style={{ marginTop: 20 }} />
                <Text style={styles.loadingText}>Connecting to OICS Institute Portal...</Text>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090d16',
  },
  header: {
    height: 58,
    backgroundColor: '#0c1222',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  logoBadge: {
    width: 34,
    height: 34,
    borderRadius: 9,
    backgroundColor: '#0891b2',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#06b6d4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  logoBadgeText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '900',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  isoBadge: {
    backgroundColor: 'rgba(6, 182, 212, 0.15)',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.3)',
  },
  isoText: {
    color: '#22d3ee',
    fontSize: 8,
    fontWeight: '700',
  },
  headerSubtitle: {
    color: '#94a3b8',
    fontSize: 10,
    fontWeight: '500',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  iconButtonText: {
    color: '#cbd5e1',
    fontSize: 16,
    fontWeight: 'bold',
  },
  webViewContainer: {
    flex: 1,
    backgroundColor: '#090d16',
  },
  webView: {
    flex: 1,
    backgroundColor: '#090d16',
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#090d16',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    zIndex: 10,
  },
  loadingLogoBadge: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: 'rgba(6, 182, 212, 0.15)',
    borderWidth: 1.5,
    borderColor: '#06b6d4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingLogoText: {
    color: '#38bdf8',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 1,
  },
  loadingText: {
    color: '#94a3b8',
    fontSize: 13,
    marginTop: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  errorContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#090d16',
  },
  errorIconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  errorIcon: {
    fontSize: 28,
  },
  errorTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  errorMessage: {
    color: '#94a3b8',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: '#0284c7',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    shadowColor: '#0284c7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
