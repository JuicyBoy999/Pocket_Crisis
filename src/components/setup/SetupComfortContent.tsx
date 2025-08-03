import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { useAppContext } from '../../context/AppContext';
import Button from '../ui/Button';
import Card from '../ui/Card';
import TextArea from '../ui/TextArea';

const SetupComfortContent: React.FC = () => {
  const { crisisPlanData, updateCrisisPlanData, setCurrentScreen } = useAppContext();
  const [link, setLink] = useState(crisisPlanData.comfortContent?.link || '');
  const [files, setFiles] = useState(crisisPlanData.comfortContent?.files || []);

  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant permission to access your photos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      const newFiles = result.assets.map(asset => ({
        name: asset.fileName || 'media',
        uri: asset.uri,
        type: asset.type || 'image',
      }));
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleSubmit = () => {
    updateCrisisPlanData('comfortContent', { link, files });
    setCurrentScreen('setup-complete');
  };

  const handleRemove = (name: string) => {
    setFiles(prev => prev.filter(file => file.name !== name));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Soothing Content</Text>

        <Card>
          <Text style={styles.cardTitle}>🎶 Add Content That Brings You Calm</Text>

          <TextArea
            label="Add a YouTube or Spotify link"
            hint="Paste a link to your favorite music, video, or playlist"
            value={link}
            onChangeText={setLink}
            placeholder="https://..."
            multiline={false}
            numberOfLines={1}
          />

          <View style={styles.mediaSection}>
            <Text style={styles.mediaLabel}>Upload Images, Audio, or Videos</Text>
            <Button
              onPress={handleImagePicker}
              variant="secondary"
              style={styles.uploadButton}
            >
              Choose Media Files
            </Button>
          </View>

          {files.length > 0 && (
            <View style={styles.previewSection}>
              <Text style={styles.previewLabel}>Preview:</Text>
              {files.map((file, index) => (
                <View key={index} style={styles.filePreview}>
                  {file.type.startsWith('image') && (
                    <Image source={{ uri: file.uri }} style={styles.previewImage} />
                  )}
                  <View style={styles.fileInfo}>
                    <Text style={styles.fileName}>{file.name}</Text>
                    <Button
                      onPress={() => handleRemove(file.name)}
                      variant="danger"
                      size="sm"
                    >
                      Remove
                    </Button>
                  </View>
                </View>
              ))}
            </View>
          )}

          <View style={styles.buttonRow}>
            <Button
              onPress={() => setCurrentScreen('setup-compassion')}
              variant="text"
              style={styles.backButton}
            >
              Back
            </Button>
            <Button
              onPress={handleSubmit}
              style={styles.nextButton}
            >
              Complete
            </Button>
          </View>
        </Card>

        <Text style={styles.stepText}>Step 5 of 5</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f9ff',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 16,
  },
  mediaSection: {
    marginVertical: 16,
  },
  mediaLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  uploadButton: {
    alignSelf: 'flex-start',
  },
  previewSection: {
    marginTop: 16,
  },
  previewLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  filePreview: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  previewImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  fileInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fileName: {
    fontSize: 12,
    color: '#6b7280',
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  backButton: {
    flex: 0,
  },
  nextButton: {
    flex: 0,
    paddingHorizontal: 32,
  },
  stepText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 16,
  },
});

export default SetupComfortContent;