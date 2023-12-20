import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { IonPage, IonContent, IonButton } from "@ionic/react";

import { supabase } from "../../supabaseClient";
import { User } from "@supabase/supabase-js";

import { Utilisateur } from "../../models/User";
import { getUserInfo } from "../../services/userService";

import LoadingScreen from "../../components/LoadingScreen";
import { useAuth } from "../../hooks/useAuth";

import "./Profile.css";

const Profile: React.FC = () => {
  const currentUser = useAuth();
  const [util, setUtil] = useState<Utilisateur | null>(null);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        setIsLoading(true);
        try {
          const userData = await getUserInfo(currentUser.id);
          setUtil(userData);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentUser]);

  const redirectToLogin = () => {
    history.push("/login");
  };

  const redirectToProfileEdit = () => {
    if (currentUser) {
      history.push(`/profile_edit/${currentUser.id}`);
    } else {
      redirectToLogin();
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Failed to sign out:", error);
    } else {
      console.log("Sign out successful");
      history.push("/login");
    }
  };

  return (
    <IonPage>
      {isLoading ? (
        <LoadingScreen />
      ) : currentUser ? (
        <div>
          Bonjour {currentUser.email}
          <IonButton onClick={signOut}>Se déconnecter</IonButton>
          <IonButton onClick={redirectToProfileEdit}>Modifier le Profil</IonButton>
        </div>
      ) : (
        <div>
          Vous n'êtes pas connecté.
          <IonButton onClick={redirectToLogin}>Se connecter</IonButton>
        </div>
      )}
    </IonPage>
  );
};

export default Profile;
