import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

export const imageUtils = {
  // Request camera permissions
  requestCameraPermission: async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    return status === 'granted';
  },

  // Request gallery permissions
  requestGalleryPermission: async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return status === 'granted';
  },

  // Take a photo with camera
  takePhoto: async () => {
    try {
      const permission = await imageUtils.requestCameraPermission();
      if (!permission) {
        throw new Error('Camera permission not granted');
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
        base64: true,
      });

      if (!result.canceled) {
        // Compress and resize the image
        const manipulatedImage = await manipulateAsync(
          result.assets[0].uri,
          [{ resize: { width: 800 } }],
          { compress: 0.7, format: SaveFormat.JPEG, base64: true }
        );
        
        return `data:image/jpeg;base64,${manipulatedImage.base64}`;
      }
      return null;
    } catch (error) {
      throw new Error('Failed to take photo: ' + error.message);
    }
  },

  // Pick an image from gallery
  pickImage: async () => {
    try {
      const permission = await imageUtils.requestGalleryPermission();
      if (!permission) {
        throw new Error('Gallery permission not granted');
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
        base64: true,
      });

      if (!result.canceled) {
        // Compress and resize the image
        const manipulatedImage = await manipulateAsync(
          result.assets[0].uri,
          [{ resize: { width: 800 } }],
          { compress: 0.7, format: SaveFormat.JPEG, base64: true }
        );
        
        return `data:image/jpeg;base64,${manipulatedImage.base64}`;
      }
      return null;
    } catch (error) {
      throw new Error('Failed to pick image: ' + error.message);
    }
  },
};