import cv2
import os

def extract_frames(video_path, output_dir, interval_sec=15):
    os.makedirs(output_dir, exist_ok=True)
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        print(f"Error opening {video_path}")
        return
    
    fps = cap.get(cv2.CAP_PROP_FPS) or 30.0
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    duration = total_frames / fps
    print(f"Video: {video_path}")
    print(f"FPS: {fps}, Total Frames: {total_frames}, Duration: {duration:.2f}s ({duration/60:.2f} mins)")
    
    frame_interval = int(fps * interval_sec)
    frame_idx = 0
    saved_count = 0
    
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        
        if frame_idx % frame_interval == 0:
            timestamp = int(frame_idx / fps)
            out_name = f"frame_{timestamp:04d}s.jpg"
            out_path = os.path.join(output_dir, out_name)
            cv2.imwrite(out_path, frame)
            saved_count += 1
            if saved_count > 30: # limit to 30 frames max
                break
        
        frame_idx += 1
        
    cap.release()
    print(f"Saved {saved_count} frames to {output_dir}\n")

if __name__ == '__main__':
    extract_frames(r"C:\Users\singh\Downloads\updation.mp4", r"c:\Users\singh\Downloads\seo\syu_task_updation_agent\frames_updation", 10)
    extract_frames(r"C:\Users\singh\Downloads\new task .mp4", r"c:\Users\singh\Downloads\seo\syu_task_updation_agent\frames_new_task", 10)
